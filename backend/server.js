const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json())

app.post("/api/auth/signup", (req,res)=>{
    console.log(req.body);

    res.json({
        message: "Account created successfully"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})