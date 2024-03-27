
import mongoose, { Schema, model } from "mongoose";

const MessageSchema=new Schema({
    
    text:{type:String,required:true},
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'Onboarding',
        required:true
    },
    receiver:{
        type:mongoose.Types.ObjectId,
        ref:'Onboarding',
    },
    createdAt:{
        type:Date,
        default:new Date().toISOString()
    },
    read:{
        type:Boolean,
        default:false
    }
})

const ChatMessages=model('Messages',MessageSchema) || mongoose.models(Messages);

export default ChatMessages;
