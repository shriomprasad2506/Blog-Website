const express = require('express')
const router = express.Router()

// Fetching Controllers
const {createComment}=require("../controllers/commentController")
const {createPost, getPosts,getSinglePost}=require("../controllers/postController")
const {likepost,unlikepost}=require("../controllers/likeController")

// Setting Routes
router.post("/comment/create",createComment)
router.post("/posts/create",createPost)
router.get("/posts",getPosts)
router.get("/post/:id",getSinglePost)
router.post("/likes/like",likepost)
router.delete("/likes/unlike",unlikepost)

module.exports = router