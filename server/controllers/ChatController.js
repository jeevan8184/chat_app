
import mongoose from "mongoose";
import ChatModel from "../models/ChatModel.js";
import ChatMessages from "../models/Message.js";
import Onboarding from '../models/Onboarding.js'

export const createChat=async(req,res)=> {
    const {senderId,receiverId}=req.body;
    
    try {
        const existChat=await ChatModel.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(existChat) return res.status(200).json(existChat);

        const newChat=new ChatModel({
            participants:[senderId,receiverId],
            messages:[]
        })
        const saveChat=await newChat.save();
        res.status(200).json(saveChat);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:` error in createChat ${error}`});
    }
}

export const fetchChatMessages=async(req,res)=> {
    const {chatId}=req.params;

    try {
        const existChat=await ChatModel.findById(chatId);
        const chatMsgs=await ChatMessages.find({_id:{$in:existChat.messages}})

        return res.status(200).json(chatMsgs);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:` error in fetchChats ${error}`});
    }
}