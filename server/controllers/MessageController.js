
import mongoose from "mongoose";
import ChatMessages from "../models/Message.js";
import ChatModel from "../models/ChatModel.js";
import GroupModel from "../models/GroupModel.js";
import Onboarding from "../models/Onboarding.js";

export const createMessage=async(req,res)=> {

    const {text,sender,receiver}=req.body;
    
    try {
        const newMsg=new ChatMessages({text,sender,receiver});
        await newMsg.save();
        const chat=await ChatModel.findOne({
            participants:{$all:[sender,receiver]}
        })
        if(!chat) return res.status(404).json({message:' Chat not found...'});

        chat.messages.push(newMsg);
        await chat.save();
        res.status(200).json(newMsg);
    } catch (error) {
        console.log(error);
        res.status(409).json({message:`error in createMessage ${error}`});
    }
}

export const createGroupMessage=async(req,res)=> {

    const {text,sender,chatId}=req.body;

    console.log('createMsg',chatId);
    try {

        const newMsg=new ChatMessages({text,sender});
        await newMsg.save();
        const existMsg=await ChatMessages.findById(newMsg._id)
             .populate({
                path:'sender',
                model:Onboarding,
                select:'profilePic username bio'
             })
        const group=await GroupModel.findById(chatId);

        if(!group) return res.status(404).json({message:'Yaar Chat not found...'});

        group.messages.push(newMsg);
        await group.save();
        res.status(200).json(existMsg);
    } catch (error) {
        console.log(error);
        res.status(409).json({message:`error in createMessage ${error}`});
    }
}


export const deleteMsg=async(req,res)=> {
    const {id}=req.params;

    try {
        const msg=await ChatMessages.findByIdAndDelete(id);
        res.status(200).json(msg);
    } catch (error) {
        res.status(400).json({message:` error in delteMsg ${error}`});
    }
}

export const DeleteMultiple=async(req,res)=> {
    const deleteMsg=req.body

    try {
        await ChatMessages.deleteMany({
            _id:{$in:deleteMsg}
        })
        res.status(200).send('Message deleted successfully!.');
    } catch (error) {
        res.status(400).json(`error in DeleteMultiple ${error}`);
    }
}
