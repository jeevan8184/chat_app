
const groupSocket=(mio)=> {

    let onlineUsers=[];
    let newNotifies=[];
    let currentGroup=null;

    mio.on('connection',(socket)=> {
        console.log(` group connected ${socket.id}`);

        socket.on('group',(newGroup)=> {
            if(newGroup) {
                currentGroup=newGroup;
            }
            console.log('group',currentGroup?.groupName);
        })

        socket.on('addUser',(newUser)=> {

            console.log('newuser',newUser);
            if(!onlineUsers.some((user)=> user.userId===newUser)) {
                onlineUsers.push({userId:newUser,socketId:socket.id});
            }
            mio.emit('groupOnline',onlineUsers);

            const userNotifies=newNotifies.filter((n)=> n.receiver===newUser);
            const socketIdReceiver=onlineUsers.find((user)=> user.userId===newUser);

            userNotifies && userNotifies.forEach((n)=> {
                mio.to(socketIdReceiver.socketId).emit('newNotify',n);
            })

            newNotifies=newNotifies.filter((n)=> n.receiver !==newUser);

            console.log('groupLine',onlineUsers);
        })

        socket.on('sendNewMsg',({message,sender,newGroup})=> {
            console.log('newMsg',message.text);
            const allUsers=onlineUsers.filter((user)=> currentGroup?.members.some((m)=> user.userId===m._id));
            console.log('allUsers',allUsers);
            allUsers.map((user)=> {
                const newNotify={
                    isRead:false,
                    date:new Date(),
                    groupName:currentGroup.groupName,
                    groupId:currentGroup._id,
                    message,
                    receiver:user.userId
                } 
                if(sender !==user.userId) {
                    mio.to(user.socketId).emit('newNotify',(newNotify));
                }
                mio.to(user.socketId).emit('receiveMsg',message);
            })
            const offlineUsers=currentGroup?.members.filter((m)=> !onlineUsers.some((u)=>u.userId===m._id));
            offlineUsers.map((user)=> {
                console.log('user offline',user.username);
            })
          
            offlineUsers.map((user)=> {
                const newNotify={
                    isRead:false,
                    date:new Date(),
                    groupName:currentGroup?.groupName,
                    groupId:currentGroup._id,
                    message,
                    receiver:user._id
                }
                newNotifies.push(newNotify);
            })
        })

        socket.on('deleteAll',({messages,sender})=> {
            const allUsers=onlineUsers.filter((user)=> currentGroup?.members.map((m)=> user.userId===m._id));
            allUsers.forEach((user)=> {
                mio.to(user.socketId).emit('delete',messages);
            })
        })

        socket.on('deleteMsg',({deleteId,sender})=> {
            const allUsers=onlineUsers.filter((user)=> currentGroup?.members.map((m)=> user.userId===m._id));
            allUsers.forEach((user)=> {
                mio.to(user.socketId).emit('setDeleteMsg',deleteId);
            })
        })

        socket.on('disconnect',()=> {
            console.log(`group disconnected ${socket.id}`);
            onlineUsers=onlineUsers.filter((user)=> user.socketId !==socket.id);
        })
    })

}

export default groupSocket;
