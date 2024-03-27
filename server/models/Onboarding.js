
import mongoose, { Schema, model } from "mongoose";
import GroupModel from "./GroupModel.js";

const OnboardingSchema=new Schema({
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    profilePic:{type:String,required:true},
    username:{type:String,required:true},
    bio:{type:String,required:true},
    groups:[{
        type:mongoose.Types.ObjectId,
        ref:GroupModel
    }]
})

const Onboarding=model('Onboarding',OnboardingSchema) || mongoose.models(OnboardingSchema);

export default Onboarding;
