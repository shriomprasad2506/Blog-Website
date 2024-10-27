const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

exports.createComment = async(req,res)=>{
    try{
        const {post,user,body}=req.body

        const comment = new Comment(
            {post,user,body}
        )
        const savedComment=await comment.save();

        const updatedpost=await Post.findByIdAndUpdate(
            post,{$push:{comments:savedComment._id}},{new: true}
        )
        .populate("comments")
        .exec()

        res.status(200).json({
            success:true,
            post:updatedpost,
            message:"Comment Created Successfully."
        })
    }
    catch(err){
        console.log("Error creating Comment.")
        console.error(err)
        res.status(500).json({
            success:false,
            error:"Error while Creating Comment.",
            message:err.message
        })
    }
}