export function SignIn(){
    return(
        <div className="flex flex-col absolute top-[30%] left-[40%] border rounded-2xl size-60 p-3">
            <form action="">
                <label>EMAIL</label>
                <br />
                <input type="email" required/>
                <br />
                <label>PASSWORD</label>
                <br/>
                <input type="password" required/>
                <br />
                <button>SIGN IN</button>
            </form>
            <p>DON'T HAVE AN ACCOUNT?</p>
            <p className="text-blue-700 underline">SIGN UP</p>
        </div>
    )
}