
import mongoose from "mongoose";
import GroupModel from "../models/GroupModel.js";
import Onboarding from "../models/Onboarding.js";
import ChatMessages from "../models/Message.js";

export const createGroup=async(req,res)=> {
    const {profilePic,bio,groupName,members,newCreator}=req.body;

    console.log('group',groupName,bio);
    try {
        const memberIds=members.map((m)=> m._id)
        memberIds.push(newCreator._id);
        const newGroup=new GroupModel({groupName,bio,profilePic,members:memberIds,creator:newCreator._id});
        await newGroup.save();

        await Promise.all(memberIds.map(async(newMember)=> {
            try {
                const existUser=await Onboarding.findById(newMember);
                existUser.groups.push(newGroup._id);
                await existUser.save();
            } catch (error) {
                console.log(error);
            }
        }));

        res.status(201).json(newGroup);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:`error in createGroup ${error}`});
    }
}

export const fetchGroups=async(req,res)=> {

    const {userId}=req.query;

    try {

        const userObj=new mongoose.Types.ObjectId(userId);
        const groups=await GroupModel.find({members:{$in:[userObj]}})
            .populate({
                path:'members',
                model:Onboarding,
                select:'profilePic username bio'
            })
            .populate({
                path:'creator',
                model:Onboarding,
                select:'profilePic username bio'
            })
        res.status(200).json(groups);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:`error in fetchGroups ${error}`});
    }
}

export const fetchGroup=async(req,res)=> {
    const {chatId}=req.params;

    try {
        const group=await GroupModel.findById(chatId)
        .populate({
            path:'members',
            model:Onboarding,
            select:'username bio'
        })

        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({message:`error in fetchGroup ${error}`});
    }
}

export const fetchGroupDetails=async(req,res)=> {
    const {chatId}=req.params;

    try {
        const group=await GroupModel.findById(chatId)
        .populate({
            path:'members',
            model:Onboarding,
            select:'username bio profilePic'
        })

        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({message:`error in fetchGroup ${error}`});
    }
}

export const fetchGroupMessages=async(req,res)=> {
    const {chatId}=req.params;

    try {
        const existGroup=await GroupModel.findById(chatId);
        const groupMsgs=await ChatMessages.find({_id:{$in:existGroup.messages}})
            .populate({
                path:'sender',
                model:Onboarding,
                select:'username bio'
            })
        
            res.status(200).json(groupMsgs);
    } catch (error) {
        res.status(400).json({message:`error in fetcgGroupMessages ${error}`});
    }
}

export const AddMemberToGroup=async(req,res)=> {
    const {chatId,newMemberIds}=req.body;
    console.log('AddMemberToGroup',chatId,newMemberIds);
    try {
        const existGroup=await GroupModel.findById(chatId);
        
        await Promise.all(newMemberIds.map(async(memberId)=> {
            try {
                existGroup.members.push(memberId);
                await existGroup.save();

                const existUser=await Onboarding.findById(memberId); 
                existUser.groups.push(existGroup._id);
                await existGroup.save();

            } catch (error) {
                console.log(error);
            }
        }));

        res.status(200).json(existGroup);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:`error in AddMemberToGroup ${error}`});
    }
}

export const RemoveMember=async(req,res)=> {
    const {chatId,memberId}=req.body;
    console.log('removeMember',chatId,memberId);

    try {
        const existGroup=await GroupModel.findById(chatId);
        const existUser=await Onboarding.findById(memberId);
        
        await GroupModel.updateOne(
            {_id:existGroup._id},
            {$pull:{members:existUser._id}}
        )
        
        await Onboarding.updateOne(
            {_id:existUser._id},
            {$pull:{groups:existGroup._id}}
        )
        res.status(200).json(existGroup);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:`error in RemoveMember ${error}`});
    }
}

export const updateGroup=async(req,res)=> {

    try {
        
    } catch (error) {
        res.status(400).json({message:`error in updateGroup ${error}`});
    }
}

export const removeGroup=async(req,res)=> {
    const {chatId}=req.params;
    console.log('removeGroup',chatId);
    
    try {
        const existGroup=await GroupModel.findByIdAndDelete(chatId);
        if(!existGroup) {
            res.status(404).json({message:'Group Not found removeGroup!.'});
        }

        await ChatMessages.deleteMany({_id:{$in:existGroup.messages}});

        await Promise.all(existGroup.members.map(async(member)=> {
            const existUser=await Onboarding.findById(member);
            existUser.groups.pull(existGroup._id);
            return existUser.save();
        }));

        res.status(200).json({message:'Group removed  successfully'});
        
    } catch (error) {
        res.status(500).json({message:`error in removeGroup ${error}`});
    }
}

export const exitGroup=async(req,res)=> {
    const {chatId,memberId}=req.body;

    try {
        const existGroup=await GroupModel.findById(chatId);
        const existUser=await Onboarding.findById(memberId);

        await GroupModel.updateOne(
            {_id:existGroup._id},
            {$pull:{members:existUser._id}}
        )
        await Onboarding.updateOne(
            {_id:existUser._id},
            {$pull:{groups:existGroup._id}}
        )

        res.status(200).json(existGroup);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:`error in  ${error}`});
    }
}
