import { HomePage } from "./routes/HomePage"
import ItemCheckout from "./routes/ItemCheckout"
import Orders from "./routes/Orders"
import Cart from "./routes/Cart"
import { SignIn } from "./routes/SignIn"
import { SignUp } from "./routes/SignUp"
import {BrowserRouter,Route,Routes} from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/itemcheckout" element={<ItemCheckout/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
