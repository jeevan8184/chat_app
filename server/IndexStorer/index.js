

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import http from 'http';
import {Server} from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();
const app=express();
app.use(cors());

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

const PORT=3001;

app.get('/new',(req,res)=> {
    res.send("Hello Guys its working...");
})

let userStatus={};
let userIds={};

io.on('connection',(socket)=> {
    console.log('a user connected');

    socket.on('typing',({room,username})=> {
        socket.broadcast.to(room).emit('user_typing',{username,isTyping:true});
    })

    socket.on('stop_typing',({room,username})=> {
        socket.broadcast.to(room).emit('user_typing',{username,isTyping:false});
    })

    socket.on('join_room',({room,username})=> {
        socket.join(room);
        userIds[username]=socket.id;
        userStatus[username]='online';
        io.to(room).emit('online_users',{users:Object.keys(userStatus),statuses:userStatus});

        socket.to(room).emit('receive_msg',{
            text:`${username} has joined!..`,
            username:'System',
            timestamp:Date.now(),
            system:true
        })
    })

    socket.on('leave_room',({room,username})=> {
        socket.leave(room);
        io.to(room).emit('user_left',username);
        
        const name=Object.keys(userIds).find((user)=> userIds[user]===socket.id);
        delete userIds[name];
        delete userStatus[name];
        io.to(room).emit('online_users',{users:Object.keys(userStatus),statuses:userStatus});

        socket.broadcast.to(room).emit('receive_msg',{
            text:`${username} has left room`,
            username:'System',
            timestamp:Date.now(),
            system:true
        })
    })

    socket.on('add_reaction',({msgId,reaction,room,name})=> {
        io.to(room).emit('add_rxn',{msgId,reaction,name});
    })
    
    socket.on('send_file', ({ username,room,img,file }) => {
        io.to(room).emit('receive_file',{username,room,img,timestamp:Date.now(),file,sender:socket.id});
    });

    socket.on("send_msg",(msg)=> {
        io.to(msg.room).emit('receive_msg',{text:msg.text,room:msg.room,sender:socket.id,username:msg.username,timestamp:Date.now(),system:false,img:false});
    })

    socket.on('delete_msg',({room,msgId})=> {
        console.log(room,msgId);
        io.to(room).emit('deleting_msg',msgId);
    })

    socket.on('disconnect',({room})=> {
        console.log('user disconnected');
        const name=Object.keys(userIds).find((user)=> userIds[user]===socket.id);
        delete userIds[name];
        delete userStatus[name];
        io.to(room).emit('online_users',{users:Object.keys(userStatus),statuses:userStatus});

    })
})

server.listen(PORT,()=> {
    console.log(`server running on PORT ${PORT}`);
})

