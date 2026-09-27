import { useState } from "react"
import { Link,useNavigate } from "react-router-dom";

export function SignIn(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        const response = await fetch("http://localhost:3000/api/auth/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json();
        
        if(response.ok){
            navigate("/")
        }else{
            alert(data.message);
        }
        
        setEmail("");
        setPassword("");


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