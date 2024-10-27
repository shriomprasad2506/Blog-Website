const Post = require("../models/postModel")

exports.createPost = async (req,res) =>{
    try{
        // Collect the data
        const {title,body}=req.body

        // Send the Data
        const response = await Post.create({
            title,
            body
        })

        // Status for showing success
        res.status(200).json({
            success:true,
            data:response,
            message:"Post created Successfully"
        })
    }
    // Sending Error Response
    catch(err){
        console.log("Error creating post.");
        console.error(err)
        res.status(500).json({
            success:false,
            data:"Error Creating Post",
            message:err.message
        })
    }
}

exports.getPosts = async(req,res)=>{
    try{
        // Fetching Posts
        const posts = await Post.find({}).populate("likes").populate("comments")
        // Sending status along with Posts
        res.status(200).json({
            success:true,
            data:posts,
            message:"Posts Fetched Successfully."
        })
    }
    catch(err){
        console.log("Error fetching posts.")
        console.error(err)
        res.status(500).json({
            success:false,
            data:"Error Fetching Posts.",
            message:err.message
        })
    }
}

exports.getSinglePost = async(req,res) =>{
    try{
        const {id}=req.params
        const post = await Post.findById({"_id":id}).populate("comments").populate("likes")
        // Sending status along with Posts
        res.status(200).json({
            success:true,
            data:post,
            message:"Posts Fetched Successfully."
        })
    }
    catch(err){
        console.log("Error fetching post.")
        console.error(err)
        res.status(500).json({
            success:false,
            data:"Error Fetching Post.",
            message:err.message
        })
    }
}