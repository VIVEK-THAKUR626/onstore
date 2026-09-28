import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeaturedItemCard } from "../components/FeaturedItemCard";

export default function Orders(){
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        async function fetchOrders(){
            try {
                const response = await fetch("http://localhost:3000/api/orders", {
                    method: "GET",
                    credentials: "include"
                });
                if(response.ok){
                    const data = await response.json();
                    setOrders(data);
                } else if(response.status === 401 || response.status === 403){
                    setError("Please sign in to view your orders.");
                } else {
                    setError("Failed to load orders.");
                }
            } catch(err){
                setError("Error: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    return(
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
                <h1 className="text-2xl font-bold">ONSTORE</h1>
                <h2 className="text-xl font-semibold text-gray-700">My Orders</h2>
                <button
                    onClick={() => navigate("/")}
                    className="border-2 border-black rounded-2xl px-5 py-2 font-semibold hover:bg-black hover:text-white transition"
                >
                    ← Home
                </button>
            </header>

            {/* Content */}
            <main className="flex flex-col items-center flex-1 p-8 gap-6">
                {loading && <p className="text-gray-500 text-lg">Loading orders...</p>}

                {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}

                {!loading && !error && orders.length === 0 && (
                    <p className="text-gray-500 text-lg">No orders yet.</p>
                )}

                {!loading && !error && orders.map(order => (
                    <div key={order._id} className="flex flex-row items-center gap-6">
                        {/* Reuse FeaturedItemCard — no buttons */}
                        <FeaturedItemCard
                            _id={order.productId}
                            imageUrl={order.productImage}
                            name={order.productName}
                            price={order.price}
                            rating={order.rating}
                            category={order.category}
                            stock={order.stock}
                            showButtons={false}
                        />

                        {/* Order summary alongside the card */}
                        <div className="flex flex-col gap-3 border border-black rounded-2xl p-6 min-w-52">
                            <h3 className="text-lg font-bold">Order Summary</h3>
                            <p>Quantity: <span className="font-semibold">{order.quantity}</span></p>
                            <p className="text-lg font-bold">Total: Rs. {order.totalPrice}</p>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
