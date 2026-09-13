export function SignUp(){
    return(
        <div className="flex flex-col absolute top-[30%] left-[40%] border rounded-2xl size-80 p-3">
            <form action="">
                <label>USERNAME</label>
                <br />
                <input type="text" required/>
                <br />
                <label>EMAIL</label>
                <br />
                <input type="email" required/>
                <br />
                <label>PASSWORD</label>
                <br/>
                <input type="password" required/>
                <br />
                <label>CONFIRM PASSWORD</label>
                <br />
                <input type="password" required/>
                <br />
                <button>SIGN UP</button>
            </form>
            <p>ALREADY HAVE AN ACCOUNT?</p>
            <p className="text-blue-700 underline">SIGN IN</p>
        </div>
    )
}