
import { Server } from "socket.io";
const newSocket=(server)=> {
    const io=new Server(server,{
        cors:{
            origin:'http://localhost:3000',
            methods:['GET','POST']
        }
    })
    io.on('connection',(socket)=> {
        console.log('a user connected');
        socket.on('send_msg',({text,username})=> {
            io.emit('receive_msg',{text,username,timestamp:Date.now(),sender:socket.id});
        })
        socket.on('disconnect',()=> {
            console.log('user disconnected');
        })
    })
}
export default newSocket;
