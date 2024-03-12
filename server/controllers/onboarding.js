
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
