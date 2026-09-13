import { HomePage } from "./routes/HomePage"
import { SignIn } from "./routes/SignIn"
import { SignUp } from "./routes/SignUp"
import {BrowserRouter,Route,Routes} from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
