
import mongoose, { Schema, model } from "mongoose";

const UserSchema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})

const User=model('User',UserSchema) || mongoose.models(User);

export default User;