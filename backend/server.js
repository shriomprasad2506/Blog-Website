const express = require("express")
const app = express()

const cors=require('cors')
app.use(cors());


// Running Server at Port
require("dotenv").config()
PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server running at Port ${PORT} http://localhost:${PORT}/`)
})

// Home Page
app.get("/",(req,res)=>{
    res.send("<h1 style='text-align:center'>Welcome to our Blog Website</h1>")
})

// DB connect
const dbConnect = require("./config/database")
dbConnect()

// MiddleWare for converting params/result to json
app.use(express.json())

// Using the routes
const routes=require("./routes/blog")
app.use("/api/v1",routes)
