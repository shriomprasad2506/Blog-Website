const mongoose=require('mongoose')

const likeSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    user:{
        type:String,
    }
})

module.exports = mongoose.model("Like",likeSchema)