import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeaturedItemCard } from "../components/FeaturedItemCard";

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCart() {
            try {
                const response = await fetch("http://localhost:3000/api/cart", {
                    method: "GET",
                    credentials: "include"
                });
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                } else if (response.status === 401 || response.status === 403) {
                    setError("Please sign in to view your cart.");
                } else {
                    setError("Failed to load cart.");
                }
            } catch (err) {
                setError("Error: " + err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCart();
    }, []);

    async function handleRemove(itemId) {
        try {
            const response = await fetch(`http://localhost:3000/api/cart/${itemId}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (response.ok) {
                setCartItems(prev => prev.filter(item => item._id !== itemId));
            } else {
                alert("Failed to remove item.");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    }

    async function handleClearCart() {
        try {
            const response = await fetch("http://localhost:3000/api/cart", {
                method: "DELETE",
                credentials: "include"
            });
            if (response.ok) {
                setCartItems([]);
            } else {
                alert("Failed to clear cart.");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
                <h1 className="text-2xl font-bold">ONSTORE</h1>
                <h2 className="text-xl font-semibold text-gray-700">My Cart</h2>
                <button
                    onClick={() => navigate("/")}
                    className="border-2 border-black rounded-2xl px-5 py-2 font-semibold hover:bg-black hover:text-white transition"
                >
                    ← Home
                </button>
            </header>

            {/* Content */}
            <main className="flex flex-col items-center flex-1 p-8 gap-6">
                {loading && <p className="text-gray-500 text-lg">Loading cart...</p>}

                {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}

                {!loading && !error && cartItems.length === 0 && (
                    <p className="text-gray-500 text-lg">Your cart is empty.</p>
                )}

                {!loading && !error && cartItems.map(item => (
                    <div key={item._id} className="flex flex-row items-center gap-6">
                        <FeaturedItemCard
                            _id={item.productId}
                            imageUrl={item.productImage}
                            name={item.productName}
                            price={item.price}
                            showButtons={false}
                        />

                        {/* Cart item summary */}
                        <div className="flex flex-col gap-3 border border-black rounded-2xl p-6 min-w-52">
                            <h3 className="text-lg font-bold">Cart Summary</h3>
                            <p>Quantity: <span className="font-semibold">{item.quantity}</span></p>
                            <p className="text-lg font-bold">Total: Rs. {(item.price * item.quantity).toFixed(2)}</p>
                            <button
                                onClick={() => handleRemove(item._id)}
                                className="border-2 border-red-500 text-red-500 rounded-2xl px-4 py-1 font-semibold hover:bg-red-500 hover:text-white transition"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                {!loading && !error && cartItems.length > 0 && (
                    <div className="flex justify-between items-center w-full max-w-2xl border-t border-gray-300 pt-4">
                        <p className="text-xl font-bold">Total: Rs. {total.toFixed(2)}</p>
                        <button
                            onClick={handleClearCart}
                            className="border-2 border-red-500 text-red-500 rounded-2xl px-5 py-2 font-semibold hover:bg-red-500 hover:text-white transition"
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
