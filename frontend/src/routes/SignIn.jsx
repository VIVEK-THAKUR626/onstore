import { useState } from "react"
import { Link } from "react-router-dom";

export function SignIn(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();

        if(password.length < 8){
            alert("Password must be 8 characters long");
            return;
        }

        alert("Sign in successful")
    }
    return(
        <div className="flex flex-col absolute top-[30%] left-[40%] border rounded-2xl size-60 p-3">
            <form onSubmit={handleSubmit} action="">
                <label>EMAIL</label>
                <br />
                <input className="border" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <br />
                <label>PASSWORD</label>
                <br/>
                <input className="border" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                <br />
                <button className="bg-gray-300 border mt-3 p-1">SIGN IN</button>
            </form>
            <p>DON'T HAVE AN ACCOUNT?</p>
            <Link to="/signup" className="text-blue-700 underline">SIGN UP</Link>
        </div>
    )
}