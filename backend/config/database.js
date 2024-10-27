const mongoose = require('mongoose')

const dbConnect = ()=>{
    mongoose.connect((process.env.DATABASE_URL),{

    })
    .then(()=>{
        console.log("Database Connected Successfully.")
    })
    .catch((err)=>{
        console.log("Database Connection Error.")
        console.log(err)
        process.exit(1)
    })
}

module.exports = dbConnect;