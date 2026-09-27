const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middlewares/auth");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


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

app.post("/api/auth/signin", async (req, res) => {
    const { email, password } = req.body;

    const normalisedEmail = (email || "").trim().toLowerCase();

    if (!password || password.length < 8) {
        return res.status(400).json({
            message: "password must be 8 characters long"
        });
    }

    const user = await User.findOne({ email: normalisedEmail });

    if (!user) {
        return res.status(400).json({
            message: "user doesn't exist"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "password is invalid"
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "sign in successful",
        username: user.username
    });
})

app.post("/api/auth/signout", (req,res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message:"Signed out successfully"
    })
})

app.get("/api/auth/me", authenticateToken, (req,res)=>{
    res.status(200).json({
        user: req.user
    })
})

app.get("/api/products", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0;
        const skip = parseInt(req.query.skip) || 0;
        const products = await Product.find({}).skip(skip).limit(limit);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products", error: err.message });
    }
});

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})