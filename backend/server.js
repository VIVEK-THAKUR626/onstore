const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json())


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((err)=>{
    console.log("MongoDB connection failed",err)
})

app.post("/api/auth/signup", async (req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    const normalisedUsername = username.trim().toLowerCase();
    const normalisedEmail = email.trim().toLowerCase();

    if(!isNaN(normalisedUsername.charAt(0))){
        return res.status(400).json({
            message:"First character of the username can't be a number"
        })
    }

    if(password.length < 8){
        return res.status(400).json({
            message:"Password must be atleast 8 characters long"
        })
    }

    const existingUser = await User.findOne({
        $or: [
            {username : normalisedUsername},
            {email : normalisedEmail}
        ]
    })

    if(existingUser){
        return res.status(409).json({
            message:"Username or email already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        username: normalisedUsername,
        email: normalisedEmail,
        password: hashedPassword
    })

    res.status(201).json({
        message: "Account created successfully"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})