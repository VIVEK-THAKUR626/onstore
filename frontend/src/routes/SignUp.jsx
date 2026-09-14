import { useState } from "react"
import { Link } from "react-router-dom";

export function SignUp(){
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        if(!isNaN(username.charAt(0))){
            alert("First character of the username can't be a number");
            return;
        }
        if(password.length < 8){
            alert("Password must be 8 characters long");
            return;
        }
        if(password !== confirmPassword){
            alert("Passwords do not match");
            return;
        }

        const response = await fetch("http://localhost:3000/api/auth/signup",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        const data = await response.json();

        alert(data.message)
    }

    return(
        <div className="flex flex-col absolute top-[30%] left-[40%] border rounded-2xl size-80 p-3">
            <form onSubmit={handleSubmit} action="">
                <label>USERNAME</label>
                <br />
                <input className="border" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                <br />
                <label>EMAIL</label>
                <br />
                <input className="border" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <br />
                <label>PASSWORD</label>
                <br/>
                <input className="border" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <br />
                <label>CONFIRM PASSWORD</label>
                <br />
                <input className={(password === confirmPassword && password.length != 0) ? "bg-green-400 border" : "bg-white border"} type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                <br />
                <button className="bg-gray-300 border mt-3 p-1">SIGN UP</button>
            </form>
            <p>ALREADY HAVE AN ACCOUNT?</p>
            <Link to="/signin" className="text-blue-700 underline">SIGN IN</Link>
        </div>
    )
}