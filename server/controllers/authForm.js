
import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const SignUp=async(req,res)=> {
    const {username,email,password,confirmPassword}=req.body

    try {
        const existUser=await User.findOne({email});
        if(existUser) res.status(400).json({message:"user exists signin"});
        if(password !==confirmPassword) return res.status(404).json({message:'password not matching'})
        const hasPass=await bcrypt.hash(password,12);
        const newUser=new User({username,email,password:hasPass});
        await newUser.save();

        const token=jwt.sign({email:newUser.email,userId:newUser.password},'secret',{expiresIn:'1h'});
        res.status(200).json({data:newUser,token});
    } catch (error) {
        res.status(500).json({message:error});
    }
}

export const SignIn=async(req,res)=> {
    const {email,password}=req.body;
    try {
        const existUser=await User.findOne({email});
        if(!existUser) res.status(400).json({message:"user does not exists signup"});
        const checkPass=await bcrypt.compare(password,existUser.password);
        if(!checkPass) return res.status(404).json({message:'password incorrect'})
        const token=jwt.sign({email:existUser.email,id:existUser._id},'secret',{expiresIn:'1h'});
        res.status(200).json({data:existUser,token})
    } catch (error) {
        res.status(500).json({message:error});
    }
}

export const getData=async(req,res)=> {
    const {id}=req.params;
    try {
        const user=await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message:`getData ${error}`})
    }
}