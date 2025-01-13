import { Link } from "react-router"
import HeartIcon from "./HeartIcon"
const Product = ({product}) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3 relative">
        <div className="relative">
        <Link to={`/product/${product._id}`}>
<img src={product.image} alt={product.name} className="w-[20rem] rounded" />
</Link>

<HeartIcon product={product}/>

        </div>  

        <div className="p-4 ">
            <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">    
               
                    <div>{product.name}</div>
                    <span className="bg-gray-100 text-pink-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">${product.price}</span>
               

            </h2>
            </Link>  
        </div>

    </div>
  )
}

export default Product