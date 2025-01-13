import { Link } from "react-router"
import HeartIcon from "./HeartIcon"
const SmallProduct = ({product}) => {
  return (
    <div className="w-[20rem] ml-[3.5rem] p-3">

        <div className="relative">
            <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className="h-auto rounded"/>
            </Link>
            <HeartIcon product={product}/>

            <div className="p-4">
              <Link to={`/product/${product._id}`}>
              <h1 className="flex justify-between items-center">

                <div>{product.name}</div>
                <span className="bg-gray-100 text-pink-600 text-sm font-medium mr-2 px-2.5  py-0.5 rounded-full dark:bg-pink-900  dark:text-pink-300">${product.price}</span>
              </h1>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default SmallProduct