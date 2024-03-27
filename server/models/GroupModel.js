import mongoose,{Schema, model} from "mongoose";

const GroupSchema=new Schema({
    groupName:{type:String,required:true},
    bio:{type:String,required:true},
    creator:{
        type:mongoose.Types.ObjectId,
        ref:'Onboarding'
    },
    members:[{
        type:mongoose.Types.ObjectId,
        ref:'Onboarding'
    }],
    messages:[{
        type:mongoose.Types.ObjectId,
        ref:'ChatMessages'
    }],
    profilePic:{type:String,required:true},
    createdAt:{type:Date,default:new Date()},

})

const GroupModel=model('GroupModel',GroupSchema) || mongoose.models(GroupModel);

export default GroupModel;

