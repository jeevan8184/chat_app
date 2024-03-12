
import mongoose, { Schema, model, models } from "mongoose";

const MessageSchema=new Schema({
    text:[
        {
            type:String
        }
    ],
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'Onboarding'
    },
    receiver:{
        type:mongoose.Types.ObjectId,
        ref:'Onboarding'
    },
    createdAt:{
        type:Date,
        default:new Date().toISOString()
    },

})

const Messages=model('Messages',MessageSchema) || models(Messages);

export default Messages;
