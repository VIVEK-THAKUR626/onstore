import { Link, useNavigate } from "react-router-dom"

export function AccountMenu({isSignedIn,onSignOut}){
    const navigate = useNavigate();
    async function signOut(){
        try{
            const response = await fetch("http://localhost:3000/api/auth/signout", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            const data = await response.json();

            if(response.ok){
                alert(data.message);
                if(onSignOut) onSignOut();
                navigate("/");
            }else{
                alert(data.message || "Failed to sign out")
            }
        }catch(err){
            alert("Sign out error: ", err)
        }
    }

    if(isSignedIn){
        return(
            <div className="absolute right-4 top-16 flex flex-col items-center bg-gray-300 text-black border-gray-300 rounded-4xl">
                <Link to="/cart" className="hover:text-blue-700 hover:bg-amber-50 p-3 w-full rounded-3xl font-bold">MY CART</Link>
                <Link to="/orders" className="hover:text-blue-700 hover:bg-amber-50 p-3 w-full rounded-3xl font-bold">MY ORDERS</Link>
                <button onClick={signOut} className="hover:text-blue-700 hover:bg-amber-50 p-3 w-full rounded-3xl font-bold">SIGN OUT</button>
            </div>
        )
    }else{
        return(
            <div className="absolute right-4 top-16 flex flex-col items-center bg-gray-300 text-black border-gray-300 rounded-4xl">
                <Link to="/signin" className="hover:text-blue-700 hover:bg-amber-50 p-3 w-full rounded-3xl font-bold">SIGN IN</Link>
                <Link to="/signup" className="hover:text-blue-700 hover:bg-amber-50 p-3 w-full rounded-3xl font-bold">SIGN UP</Link>
            </div>
        )
    }
}