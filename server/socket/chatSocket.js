
import { Server } from "socket.io";

const newSocket=(nio)=> {
    // const io=new Server(server,{
    //     cors:{
    //         origin:'http://localhost:3000',
    //         methods:['GET','POST']
    //     }
    // })

    let onlineUsers=[];
    let notifications=[];
    
    // const nio=io.of('/chat');

    nio.on('connection',(socket)=> {
        // console.log("user connected",socket.id)

        socket.on('newUser',(newUser)=> {
            console.log('newuser',newUser);
            if(!onlineUsers.some((user)=> user.userId===newUser)) {
                onlineUsers.push({userId:newUser,socketId:socket.id,isTyping:false});
            }
            console.log(onlineUsers);
            nio.emit('onlineUsers',onlineUsers);

            const receiverSocket=onlineUsers.find((user)=>user.userId===newUser);

            const userNotifies=notifications.filter((n)=> n.receiver===newUser );
            
            userNotifies.forEach((notify)=> {
                nio.to(receiverSocket.socketId).emit('notify',(notify))
            } )
            
            notifications=notifications.filter((n)=> n.receiver !==newUser);

        })
        // console.log(onlineUsers);
        
        socket.on('sendMessage',async({newMsg,sender,receiver,name})=> {

            const senderSocket=onlineUsers.find((user)=> user.userId===sender);
            const receiverSocket=onlineUsers.find((user)=>user.userId===receiver);

            if(senderSocket) {
                nio.to(senderSocket.socketId).emit('receiveMsg',(newMsg));
            }
            const newNotify={name,newMsg,sender,receiver,isRead:false,date:new Date()}

            if(receiverSocket) {
                nio.to(receiverSocket.socketId).emit('receiveMsg',(newMsg));
                nio.to(receiverSocket.socketId).emit('notify',(newNotify))
            } else {
                notifications.push(newNotify);
            }
        })
        socket.on('deleteMultiple',({messages,sender,receiver})=> {

            const senderSocket=onlineUsers.find((user)=> user.userId===sender);
            const receiverSocket=onlineUsers.find((user)=>user.userId===receiver);

            if(senderSocket) {
                nio.to(senderSocket.socketId).emit('delete',(messages));
            }
            if(receiverSocket) {
                nio.to(receiverSocket.socketId).emit('delete',(messages));   
            }
        })

        socket.on('deleteMsg',({newMessages,sender,receiver})=> {

            const senderSocket=onlineUsers.find((user)=> user.userId===sender);
            const receiverSocket=onlineUsers.find((user)=>user.userId===receiver);

            if(senderSocket) {
                nio.to(senderSocket.socketId).emit('setDeleted',(newMessages));
            }
            if(receiverSocket) {
                nio.to(receiverSocket.socketId).emit('setDeleted',(newMessages));   
            }
        })

        socket.on('startTyping',({sender,receiver})=> {

            const senderSocket=onlineUsers.find((user)=>user.userId===sender);
            const receiverSocket=onlineUsers.find((user)=>user.userId===receiver);

            if(senderSocket) {
                senderSocket.isTyping=true;
                nio.emit('onlineUsers',onlineUsers);
                // console.log(onlineUsers);
            }
            if(receiverSocket) {
                nio.to(receiverSocket.socketId).emit('typing',({typingNow:true}));
            }
        })

        socket.on('stopTyping',({sender,receiver})=> {

            const senderSocket=onlineUsers.find((user)=>user.userId===sender);
            const receiverSocket=onlineUsers.find((user)=>user.userId===receiver);

            if(senderSocket) {
                senderSocket.isTyping=false;
                nio.emit('onlineUsers',onlineUsers);
                // console.log(onlineUsers);
            }
            if(receiverSocket) {
                nio.to(receiverSocket.socketId).emit('typing',({typingNow:false}));
            }
        })

        socket.on('disconnect',()=> {
            console.log("user disconnected");
            onlineUsers=onlineUsers.filter((user)=> user.socketId !== socket.id);
            nio.emit('onlineUsers',onlineUsers);
        })
    })
}

export default newSocket;
