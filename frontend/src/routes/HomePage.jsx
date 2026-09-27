import { FeaturedItemCard } from "../components/FeaturedItemCard"
import { AccountMenu } from "../components/AccountMenu"
import { useEffect, useState } from "react"

export function HomePage(){
    const [menuOpen,setMenuOpen] = useState(false);
    const [user,setUser] = useState(null);
    const [products,setProducts] = useState([]);
    const [hasMore,setHasMore] = useState(true);
    const [loadingMore,setLoadingMore] = useState(false);

    useEffect(()=>{
        async function checkAuth(){
            try{
                const response = await fetch("http://localhost:3000/api/auth/me", {
                    method:"GET",
                    credentials:"include"
                });

                if(response.ok){
                    const data = await response.json();
                    setUser(data.user);
                }else{
                    setUser(null);
                }
            } catch(err){
                console.log(err);
                setUser(null);
            }
        }

        async function fetchFeaturedProducts(){
            try {
                const response = await fetch("http://localhost:3000/api/products?limit=20&skip=0");
                if(response.ok){
                    const data = await response.json();
                    setProducts(data);
                    if(data.length < 20){
                        setHasMore(false);
                    }
                }
            } catch(err){
                console.log("Error fetching products:", err);
            }
        }

        checkAuth();
        fetchFeaturedProducts();
    }, [])

    async function handleShowMore(){
        if(loadingMore || !hasMore) return;
        setLoadingMore(true);
        try {
            const response = await fetch(`http://localhost:3000/api/products?limit=10&skip=${products.length}`);
            if(response.ok){
                const newProducts = await response.json();
                if(newProducts.length === 0){
                    setHasMore(false);
                } else {
                    setProducts(prev => [...prev, ...newProducts]);
                    if(newProducts.length < 10){
                        setHasMore(false);
                    }
                }
            }
        } catch(err){
            console.log("Error fetching more products:", err);
        } finally {
            setLoadingMore(false);
        }
    }

    return(
        <div className="flex flex-col justify-between w-screen min-h-screen">
            <header className="flex justify-between items-center h-[10%] m-4">
                <h1 className="text-2xl font-bold">ONSTORE</h1>
                <h1 className="text-3xl font-bold text-gray-500">Welcome {user ? user.username : "Guest"}</h1>
                <button onClick={()=>setMenuOpen(!menuOpen)} className="size-16 text-2xl border-2 border-black rounded-[50%] p-1">👤</button>
                {menuOpen && <AccountMenu isSignedIn={user} onSignOut={()=>setUser(null)} />}
            </header>
            <main className="flex flex-col justify-evenly">
                <section className="flex items-center justify-evenly">
                    <input className="w-[70%] border-4 border-black rounded-2xl p-1"/>
                    <button className="border-2 border-black rounded-2xl p-2">Search</button>
                </section>
                <section className="flex flex-col items-center">
                    <h1>Featured Items</h1>
                    <div className="flex flex-wrap justify-evenly items-center">
                        {
                            products.map(product => (
                                <FeaturedItemCard 
                                    key={product._id || product.id}
                                    name={product.name}
                                    imageUrl={product.imageUrl}
                                    category={product.category}
                                    price={product.price}
                                    stock={product.stock}
                                    rating={product.rating}
                                />
                            ))
                        }
                    </div>
                </section>
            </main>
            <footer className="flex justify-center items-center py-8">
                {hasMore ? (
                    <button 
                        onClick={handleShowMore}
                        disabled={loadingMore}
                        className="border-2 border-black rounded-2xl px-6 py-2 hover:bg-black hover:text-white transition font-semibold cursor-pointer disabled:opacity-50"
                    >
                        {loadingMore ? "Loading..." : "Show More"}
                    </button>
                ) : (
                    <p className="text-gray-500 font-semibold text-lg">you have reached the end</p>
                )}
            </footer>
        </div>
    )
}