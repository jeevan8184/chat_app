
import mongoose, { Schema, model } from "mongoose";

const ChatSchema=new Schema({
    createdAt:{
        type:Date,
        default:Date.now()
    },
    participants:[{
        type:mongoose.Types.ObjectId,
        ref:'Onboarding'
    }],
    messages:[{
        type:mongoose.Types.ObjectId,
        ref:'ChatMessages'
    }]

})

const ChatModel=model('ChatModel',ChatSchema) || mongoose.models(ChatModel);

export default ChatModel;
