
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {Server} from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';

const app=express();
app.use(cors());

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

const PORT=5002;

app.use(bodyParser.json({extended:true,limit:"30mb"}));
app.use(bodyParser.urlencoded({extended:true,limit:"30mb"}));

app.get('/',(req,res)=> {
    res.send("Hello Guys!..");
})

io.on('connection',(socket)=> {
    console.log('user connected',socket.id);

    socket.emit('me',socket.id);

    socket.on("callUser",({from,name,signaldata,userToCall})=> {
        io.to(userToCall).emit('callUser',{from,name,signal:signaldata});
    })

    socket.on("answerCall",(data)=> {
        io.to(data.to).emit("callAccepted",data.signal);
    })

    socket.on('disconnect',()=> {
        console.log('user disconnected!.');
        
    })

})

server.listen(PORT,()=> console.log('Server is running on PORT 5002'));
