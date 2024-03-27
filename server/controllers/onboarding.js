
import GroupModel from "../models/GroupModel.js";
import Onboarding from "../models/Onboarding.js";
import User from "../models/User.js";

export const PostData=async(req,res)=> {

    const {profilePic,username,bio,author}=req.body;
    try {
        const newBoard=new Onboarding({profilePic,username,bio,author});
        await newBoard.save();
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(409).json({message:`error in PostData ${error}`});
    }
}

export const getUserWithId=async(req,res)=> {
    const {id}=req.params;

    try {
        const user=await Onboarding.findById(id)
            .populate({path:'author',model:User}).exec();
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message:`error in getUserWithId ${error}`})
    }
}

export const getUser=async(req,res)=> {
    const {author}=req.query;

    try {
        const user=await Onboarding.findOne({author})
            .populate({
                path:'author',
                model:User,
                select:'email'
            })
        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({message:`Failed to getUser ${error}`});
    }
}

export const getUsers=async(req,res)=> {
    const {id}=req.params;
    try {
        
        const users=await Onboarding.find({author:{$ne:id}})
            .populate({
                path:'author',
                model:User,
                select:'email'
            }).exec();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message:`error in getUsers ${error}`});
    }
}

export const fetchUsers=async(req,res)=> {
    const {searchTerm="",pageNumber=1,pageSize=10,sortBy='desc'}=req.body;

    try {
        const skipAmt=(Number(pageNumber)-1)*pageSize;
        const regex=new RegExp(searchTerm,"i");
        const query={};

        if(searchTerm.trim() !=="") {
            query.$or=[
                {username:{$regex:regex}},
                {bio:{$regex:regex}}
            ]
        }

        const allUsers=await Onboarding.find(query)
            .limit(pageSize)
            .sort({createdAt:sortBy})
            .skip(skipAmt)
            .exec()

        const totalDocs=await Onboarding.countDocuments(query);
        const isNext=totalDocs>allUsers.length+skipAmt;

        res.status(200).json({allUsers,isNext});

    } catch (error) {
        res.status(500).json({message:`error in fetchUsers ${error}`});
    }
}

export const fetchUser=async(req,res)=>{
    const {userId}=req.params;

    try {
        const existUser=await Onboarding.findById(userId)
            .populate({path:'author',model:User,select:'email'})
            .populate({path:'groups',model:GroupModel,select:'groupName profilePic bio '})
        res.status(200).json(existUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:`error in fetchUser ${error}`});
    }
}