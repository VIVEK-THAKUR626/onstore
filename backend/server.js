const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json())

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=>{
    console.log("MongoDB connection failed",err)
})

app.post("/api/auth/signup", (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})