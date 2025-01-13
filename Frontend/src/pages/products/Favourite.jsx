import { useSelector } from "react-redux"
// import {selectFavproduct} from "../../Redux/features/favoriteSlice.js"
import Product from "./Product"

const Favourite = () => {
    // const favorites = useSelector(selectFavproduct);
    const favorites = useSelector((state) => state.favorites);
    console.log(favorites);
    
  return (
    <div className="ml-[2rem]">
        <h1 className="text-lg font-bold ml-[5rem] mt-[3rem] ">
            Favorite Products
        </h1>

        <div className="flex flex-wrap">

            {favorites.map((product)=>(
                <Product key={product._id} product={product}/>
            ))}

        </div>
    </div>
  )
}

export default Favourite