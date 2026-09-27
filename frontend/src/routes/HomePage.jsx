import { products } from "../assets/products"
import { FeaturedItemCard } from "../components/FeaturedItemCard"
import { AccountMenu } from "../components/AccountMenu"
import { useEffect, useState } from "react"

export function HomePage(){
    const [menuOpen,setMenuOpen] = useState(false);
    const [user,setUser] = useState(null);

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
                setUser(null);
            }
        }

        checkAuth();
    }, [])

    return(
        <div className="flex flex-col justify-evenly w-screen h-screen">
            <header className="flex justify-between items-center h-[10%] m-4">
                <h1 className="text-2xl font-bold">ONSTORE</h1>
                <h1 className="text-3xl font-bold text-gray-500">Welcome {user ? user.username : "Guest"}</h1>
                <button onClick={()=>setMenuOpen(!menuOpen)} className="size-16 text-2xl border-2 border-black rounded-[50%] p-1">👤</button>
                {menuOpen && <AccountMenu isSignedIn={user} onSignOut={()=>setUser(null)} />}
            </header>
            <main className="flex flex-col justify-evenly h-[80%]">
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
                                    key={product.id}
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
            <footer></footer>
        </div>
    )
}