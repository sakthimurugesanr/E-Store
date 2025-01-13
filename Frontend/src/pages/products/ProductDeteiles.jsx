import { useState } from "react"
import { useParams,Link,useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import {useGetProductDetailesQuery,useCreateReviewMutation} from '../../Redux/api/productApiSlice'
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import {    
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore 
} from 'react-icons/fa'
import { addToCart } from "../../Redux/features/cart/cartSlice"
import moment from 'moment' 
import HeartIcon from "./HeartIcon"
import Ratings from "./Ratings"
import ProductTabs from "./ProductTabs"
import { toast } from "react-toastify"

const ProductDeteiles = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const {id:productId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const [qty,setqty]=useState(1);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState('');

    const {data:product,isLoading,error,refetch}=useGetProductDetailesQuery(productId);

    const [createReview,{isLoading:loadingProductReview}]=useCreateReviewMutation()


    const submitHandler = async(e)=>{
        e.preventDefault();

        try {

            await createReview({productId,rating,comment}).unwrap()
            refetch();
            toast.success("Review Added")
            
        } catch (error) {
            toast.error(error?.data || error.message)
            
            
        }
    }

    const addToCartHandler = ()=>{
        dispatch(addToCart({...product,qty}))
        navigate('/cart')

    }
  return (
    <>
    <div>
    <Link to='/' className="text-white font-semibold ml-[6rem] hover:underline hover:text-pink-600 mx-auto">Go Back</Link>
    </div>


    {isLoading ? (<Loader/>) : error ? (<Message variant="danger">{error?.data?.message|| error.message}</Message>):(
        <>
            <div className="flex flex-wrap relative mt-[2rem] ml-[7rem] items-between ">
                <div>
                <img src={product.image} alt={product.name}className=" w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[35rem] mr-[2rem] "/>
                <HeartIcon product={product}/>
                </div>

                <div className="flex flex-col justify-between ">
                    <h2 className="text-2xl font-semibold">{product.name}</h2>
                    <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text=[#B0B0B0]">
                        {product.description}
                    </p>
                    <p className=" text-5xl text-white my-4 font-extrabold">${product.price}</p>

                    <div className="flex items-center justify-between w-[20rem]">
                        <div className="one">
                            <h1 className="flex items-center mb-6">
                                <FaStore className="mr-2 text-pink-600"/> Brand: {" "}{product.brand}
                            </h1>
                            <h1 className="flex items-center mb-6">
                                <FaClock className="mr-2 text-pink-600"/> Added: {" "}{moment(product.createdAt).fromNow()}
                            </h1>
                            <h1 className="flex items-center mb-6">
                                <FaStar className="mr-2 text-pink-600"/> Review: {" "}{product.numReviews}
                            </h1>
                        </div>
                        <div className="two">
                            <h1 className="flex items-center mb-6">
                                <FaStar className="mr-2 text-white"/> Rating: {" "}{product.rating} 
                            </h1>
                            <h1 className="flex items-center mb-6">
                                <FaShoppingCart className="mr-2 text-white"/> Rating: {" "}{product.quantity} 
                            </h1>
                            <h1 className="flex items-center mb-6">
                                <FaBox className="mr-2 text-white"/> In Stock   : {" "}{product.countInStock} 
                            </h1>
                        </div>
                    </div>

                   <div className="flex justify-between flex-wrap">
                     <Ratings value={product.rating} text={`${product.numReviews}reviews`}/>

                     {product.countInStock > 0 && (
                        <div>
                            <select value={qty} onChange={e=>setqty(e.target.value)} className="w-[6rem] p-2 rounded-lg text-pink-700 bg-black">
                                {[...Array(product.countInStock).keys()].map((x)=>(
                                        <option key={x + 1} value={x+1}> 
                                        {x+1}
                                        </option>
                                ))}
                            </select>
                        </div>    
                     )}

                   </div>
                   
                        
                   <div className="btn-container" >
                    <button  onClick={addToCartHandler} 
                        className="bg-pink-700 hover:bg-pink-800 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                    >Add to cart</button>
                   </div>
                </div>

                <div className="mt-[5rem] container flex flex-wrap items-start jusrify-between ml-[10rem] ">
                     <ProductTabs 
                        loadingProductReview={loadingProductReview}
                        userInfo={userInfo}
                        qty={qty}
                        rating={rating}
                        submitHandler={submitHandler}
                        setRating={setRating}
                        comment={comment}
                        setComment={setComment}
                        product={product}


                     />
                </div>
            </div>  
        </>
    )}



 

</>
  )
}

export default ProductDeteiles