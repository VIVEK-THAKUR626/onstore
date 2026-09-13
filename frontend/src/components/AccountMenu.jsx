import { Link } from "react-router-dom"

export function AccountMenu(){
    return(
        <div className="absolute right-4 top-16 flex flex-col items-center bg-gray-300 text-black border-gray-300 rounded-4xl">
            <Link to="/signin" className="hover:text-blue-700 hover:bg-amber-50 p-3 w-full rounded-3xl font-bold">SIGN IN</Link>
            <Link to="/signup" className="hover:text-blue-700 hover:bg-amber-50 p-3 w-full rounded-3xl font-bold">SIGN UP</Link>
        </div>
    )
}