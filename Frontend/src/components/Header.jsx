import ProductCarousel from "../pages/products/ProductCarousel"
import SmallProduct from "../pages/products/SmallProduct"
import {useGetTopPRoductsQuery} from "../Redux/api/productApiSlice"
const Header = () => {
    const {data,isLoading,error}= useGetTopPRoductsQuery()
    

    if(isLoading){
        return <div>Loading...</div>
    }

    if(error){
        return <h1>Error</h1>
    }
   
    
  return ( 
    <>
        <div className="flel flex-around">
            <div className=" xl:flex lg:hidden md:hidden sm:hidden">

                <div className="grid grid-cols-2">
                    {data.map((product)=>(
                        <div key={product._id}>
                            <SmallProduct product={product}/>

                        </div>
                    ))}
                </div>
                    <ProductCarousel/>
            </div>
        </div>
    
    </>
  )
}

export default Header