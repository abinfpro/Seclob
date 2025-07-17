const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path");
require("dotenv").config()
const DB = require("./connection/dbConnection")
const userRouter = require("./routes/userRoute")
const port = process.env.PORT


app.use(cors({
    origin:"https://seclob-1.onrender.com",
    Credentials:true,
}))

        
app.use(express.json({limit: '25mb'}))
app.use("/api/auth",userRouter) 
app.use(express.urlencoded({extended:true})) 
app.use("/public/uploads", express.static(path.join(__dirname, "public/uploads")));

 
app.listen(port,()=>{
    console.log("server started 8080");
    
})

DB()  