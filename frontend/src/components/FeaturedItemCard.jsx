export function FeaturedItemCard({imageUrl,name,category,price,rating,stock}){
    return(
        <div className="flex flex-col items-center justify-evenly border border-black rounded-2xl w-65 min-h-95 m-1.5">
            <img className="h-52 w-full object-cover" src={imageUrl} />
            <p>{name}</p>
            <p>⭐️ {rating}</p>
            <div className="flex flex-col items-start">
                <p>Rs. {price}</p>
                <p>Stock: {stock}</p>
                <p>Category : {category}</p>
            </div>
        </div>
    )
}