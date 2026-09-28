import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FeaturedItemCard } from "../components/FeaturedItemCard";

export default function ItemCheckout(){
    const { state } = useLocation();
    const navigate = useNavigate();
    const product = state?.product;

    const [quantity, setQuantity] = useState(1);
    const [stockError, setStockError] = useState("");

    if(!product){
        return(
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-xl font-semibold text-gray-600">No product selected.</p>
                <button
                    onClick={() => navigate("/")}
                    className="border-2 border-black rounded-2xl px-6 py-2 hover:bg-black hover:text-white transition font-semibold"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const totalPrice = parseFloat((product.price * quantity).toFixed(2));

    function handleQuantityChange(e){
        const val = parseInt(e.target.value) || 1;
        if(val > product.stock){
            setStockError("Not enough stock");
        } else {
            setStockError("");
        }
        setQuantity(val < 1 ? 1 : val);
    }

    async function handleConfirm(){
        if(quantity > product.stock){
            setStockError("Not enough stock");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId: product._id, quantity })
            });

            const data = await response.json();

            if(response.ok){
                alert("Order placed successfully!");
                navigate("/orders");
            } else {
                alert(data.message || "Failed to place order");
            }
        } catch(err) {
            alert("Error placing order: " + err.message);
        }
    }

    function handleCancel(){
        navigate("/");
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-8 p-8">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <div className="flex flex-col md:flex-row items-start justify-center gap-10 w-full max-w-4xl">
                {/* Product Card */}
                <FeaturedItemCard
                    _id={product._id}
                    imageUrl={product.imageUrl}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    rating={product.rating}
                    stock={product.stock}
                    showButtons={false}
                />

                {/* Payment Window */}
                <div className="flex flex-col gap-4 bg-blue-950 text-white rounded-2xl p-8 min-w-72 shadow-xl">
                    <h2 className="text-2xl font-bold text-center">Payment Window</h2>

                    <div className="flex justify-between">
                        <span className="font-semibold">Price per item:</span>
                        <span>Rs. {product.price}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold">Quantity:</label>
                        <input
                            type="number"
                            min={1}
                            max={product.stock}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="text-white rounded-lg px-3 py-1 w-full border-2 border-blue-300 focus:outline-none"
                        />
                        {stockError && (
                            <p className="text-red-400 font-semibold text-sm">{stockError}</p>
                        )}
                    </div>

                    <div className="flex justify-between text-lg font-bold border-t border-blue-400 pt-3">
                        <span>Total Price:</span>
                        <span>Rs. {totalPrice}</span>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 rounded-xl transition"
                        >
                            CANCEL
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={!!stockError || quantity < 1}
                            className="flex-1 bg-green-500 hover:bg-green-400 text-white font-bold py-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            CONFIRM
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}