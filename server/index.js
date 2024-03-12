
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import http from 'http';
import {Server} from 'socket.io';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js'
import onBoard from './routes/onBoard.js'
import newSocket from './socket/index.js';

dotenv.config();
const app=express();
app.use(cors());

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

const server=http.createServer(app);
newSocket(server);

app.use('/auth',authRouter);
app.use('/onBoard',onBoard);

server.listen(process.env.PORT ,()=> {
    console.log(`server running on PORT ${process.env.PORT}`);
})
 mongoose.connect(process.env.MONGODB_URL,{dbName:'chat_app123'})
    // .then(app.listen(process.env.PORT,()=> console.log(`server running onPORT ${process.env.PORT} mongoose`)))
    .catch((error)=> console.log(error));

    