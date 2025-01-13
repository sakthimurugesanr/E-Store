import { useParams } from "react-router"
import Header from "../components/Header"
import { useGetProductsQuery } from "../Redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router";
import Product from "./products/Product";
const Home = () => {
  const {keyword}=useParams();
  const {data,isLoading,isError}=useGetProductsQuery({keyword});
  console.log(data);
  
  return (
    <>
        {!keyword ? <Header/> : null}
        {isLoading ? (<Loader/>) : isError ?(<Message variant="danger">
            {isError?.data?.message || isError.error}
        </Message>

        ):( 
          <>
            <div className="flex justify-between items-center">
              <h1 className="ml-[20rem] mt-[8rem] text-[3rem] font-bold">
                Special Product
              </h1>

              <Link to={`/shop`} className="mr-[18rem] mt-[8rem] bg-pink-600 font-bold rounded-full py-2 px-10 " >
              shop
              </Link>
              </div>

            <div>
              <div className="flex justify-center flex-wrap mt-[2rem] ">
                {data.products.map((product) =>(

                  <div key={product._id}>
                    <Product product={product}/>
                  </div>
                ))}
 
              </div>

            </div>
          </>
        )}
    </>
  )
}

export default Home 