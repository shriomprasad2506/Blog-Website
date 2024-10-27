const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",  //This will tell yeh kis model ka refer hai
        required:true
    },
    user:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Comment",commentSchema)