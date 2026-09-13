import { products } from "../assets/products"
import { FeaturedItemCard } from "../components/FeaturedItemCard"
import { AccountMenu } from "../components/AccountMenu"
import { useState } from "react"

export function HomePage(){
    const [menuOpen,setMenuOpen] = useState(false);

    return(
        <div className="flex flex-col justify-evenly w-screen h-screen">
            <header className="flex justify-between items-center h-[10%] m-4">
                <h1 className="text-2xl font-bold">ONSTORE</h1>
                <button onClick={()=>setMenuOpen(!menuOpen)} className="size-16 text-2xl border-2 border-black rounded-[50%] p-1">👤</button>
                {menuOpen && <AccountMenu />}
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