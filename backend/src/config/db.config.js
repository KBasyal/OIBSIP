require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_DB_URL,{
    dbName:process.env.MONGO_DB_NAME
}).then(()=>{
    console.log("Successfully connected to the Database")
}).catch((err)=>{
    console.log("Error while connecting to the Database")
    process.exit(1)
})