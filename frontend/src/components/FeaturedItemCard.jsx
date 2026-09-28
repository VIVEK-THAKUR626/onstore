import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FeaturedItemCard({_id, imageUrl, name, category, price, rating, stock, showButtons, isSignedIn}){
    const navigate = useNavigate();
    const [cartMsg, setCartMsg] = useState("");

    async function buyItem(){
        if(!isSignedIn){
            navigate("/signin");
            return;
        }
        if(stock === 0){
            alert("Item not available");
            return;
        }
        // Navigate to checkout, passing product data via location state
        navigate("/itemcheckout", {
            state: { product: { _id, imageUrl, name, category, price, rating, stock } }
        });
    }

    async function addToCart(){
        if(!isSignedIn){
            navigate("/signin");
            return;
        }
        if(stock === 0){
            setCartMsg("Out of stock");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId: _id, quantity: 1 })
            });

            const data = await response.json();

            if(response.ok){
                setCartMsg("Added!");
            } else {
                setCartMsg(data.message || "Failed");
            }
        } catch(err) {
            setCartMsg(err);
        }

        // Clear the message after 2 seconds
        setTimeout(() => setCartMsg(""), 2000);
    }

    return(
        <div className="flex flex-col items-center justify-evenly border border-black rounded-2xl w-65 min-h-95 m-1.5">
            <img className="h-52 w-full object-contain" src={imageUrl} />
            <p>{name}</p>
            <p>⭐️ {rating}</p>
            <div className="flex flex-col items-start">
                <p>Rs. {price}</p>
                <p>Stock: {stock}</p>
                <p>Category : {category}</p>
            </div>
            { showButtons && <div className="flex flex-col w-full items-center gap-1 px-2 pb-2">
                <div className="flex w-full items-center justify-evenly">
                    <button onClick={buyItem} className="bg-blue-300 p-2 font-bold w-[50%] border rounded-2xl">BUY</button>
                    <button onClick={addToCart} className="bg-red-500 p-2 font-bold w-[50%] border rounded-2xl">ADD TO CART</button>
                </div>
                {cartMsg && <p className="text-sm font-semibold text-green-600">{cartMsg}</p>}
            </div> }
        </div>
    )
}