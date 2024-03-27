
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import ChatSocket from './socket/chatSocket.js';
import GroupSocket from './socket/GroupSocket.js';

import authRouter from './routes/auth.js'
import onBoard from './routes/onBoard.js'
import chatRouter from './routes/ChatRoute.js';
import messageRouter from './routes/MessageRoute.js';
import GroupRouter from './routes/GroupRoute.js'
import { Server } from 'socket.io';

dotenv.config();
const app=express();
app.use(cors());

app.use(bodyParser.json({limit:"50mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}));
app.use(cors());

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

const nio=io.of('/chat')
const mio=io.of('/group');

ChatSocket(nio);
GroupSocket(mio);


app.use('/auth',authRouter);
app.use('/onBoard',onBoard);
app.use('/messages',messageRouter);
app.use('/chats',chatRouter);
app.use('/group',GroupRouter);

 mongoose.connect(process.env.MONGODB_URL,{dbName:'new_chat'})
    // .then(app.listen(process.env.PORT,()=> console.log(`server running onPORT ${process.env.PORT} mongoose`)))
    .catch((error)=> console.log(error));

    server.listen(process.env.PORT ,()=> {
        console.log(`server running on PORT ${process.env.PORT}`);
    })