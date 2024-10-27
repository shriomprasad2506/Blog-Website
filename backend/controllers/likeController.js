const Post=require("../models/postModel")
const Like=require('../models/likeModel')

exports.likepost= async (req,res)=>{
    try{
        const {post,user}=req.body

        const like = await Like.create({
            post,user
        })

        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:like}},{new:true}).populate("likes").exec()

        res.status(200).json({
            success:true,
            data: updatedPost,
            message:"Likes Created Succesfully"
        })
    }
    catch(err){
        console.log("Error Liking");
        console.error(err)
        res.status(500).json({
            success:false,
            data:"Error Liking Post",
            message:err.message
        })
    }
}

exports.unlikepost = async(req,res)=>{
    try{
        const {post,like}=req.body
        // delete like in like database
        await Like.findByIdAndDelete(like)

        // delete like from post likes array
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:like}},{new:true})
        res.status(200).json({
            success:true,
            data: updatedPost,
            message:"UnLiked Post Succesfully"
        })
    }
    catch(err){
        console.log("Error Unliking Post.")
        console.error(err)
        res.status(500).json({
            success:true,
            data:"Error Unliking Post.",
            message:err.message
        })
    }
}