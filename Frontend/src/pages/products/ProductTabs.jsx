import { useState } from "react"
import { Link } from "react-router"
import Ratings from "./Ratings"
import { useGetTopPRoductsQuery } from "../../Redux/api/productApiSlice"
import SmallProduct from "./SmallProduct"
import Loader from "../../components/Loader"
import { FaRecycle } from "react-icons/fa"
const ProductTabs = ({

    loadingProductReview,
    userInfo,
    submitHandler,
    rating,
    setRating,
    comment,
    setComment,
    product, 
}) => {
    const { data, isLoading } = useGetTopPRoductsQuery();

    const [aisActive,setActice] = useState(1);

    const handleSubmit = (number)=>{
            setActice(number)
    }



  
  return (
    <div className="flex flex-col md:flex-row"> 
        
        <section className="ml-[5rem]">

            <div className={`flex-1 p-4 cursor-pointer text-lg ${aisActive === 1 ?  "font-bold text-pink-500" : ""}`}
                onClick={()=> handleSubmit(1)}
            >
                Write your Review
            </div>
            <div className={`flex-1 p-4 cursor-pointer text-lg ${aisActive === 2 ?  "font-bold text-pink-500" : ""}`}
                onClick={()=> handleSubmit(2)}
            >
                All Reviews
            </div>
            <div className={`flex-1 p-4 cursor-pointer text-lg ${aisActive === 3 ? "font-bold text-pink-500"  : ""}`}
                onClick={()=> handleSubmit(3)}
            >
                Related Products
            </div>

        </section>



        <section>
            {aisActive ===  1 && (
                <div className="mt-4">

                    {userInfo ? (
                        <form onSubmit={submitHandler}>
                            <div className="my-2">
                                <label htmlFor="raing" className="block text-lg mb-2">Rating</label>
                            <select id="rating" required value={rating} onChange={(e) => setRating(e.target.value)} className="p-2 border rounded-lg xl:w-[40rem] text-white bg-black">
                                <option value="" >Select Rating</option>
                                <option value="1">Inferior</option>
                                <option value="2">Decent</option>
                                <option value="3">Great</option>
                                <option value="4">Excelent</option>
                                <option value="5">Exceptional</option>
                            </select>
                            </div> 

                            <div className="my-2">
                        <label htmlFor="comment" className="block text-lg mb-2">Comment</label>
                        <textarea  required value={comment} onChange={(e) => setComment(e.target.value)} className="p-2 border rounded-lg xl:w-[40rem] text-white bg-black" id="comment" placeholder="Write your comment ..."></textarea>

                    </div> 
                            <button type="submit" disabled={loadingProductReview} className="bg-pink-600 text-white py-2 px-4 rounded-lg" >Submit</button> 
                        </form>
                        
                    
                    ):(

                        <p>Plese<Link to='/login'>Sign up</Link>to Write a Review</p>
                    )}

                   
                </div>

                


            )}
        
        </section>

        <section>
          {aisActive === 2 && (
            <>
                <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>

            <div>
                {product.reviews.map((review)=>(
                    <div key={review._id} className="bg-[#1A1A1A] p-4 rounded-lg  xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"> 
                            {}
                            <div className="flex justify-between items-center">
                                <strong className="text-[#B0B0B0]">
                                {review.name}
                                </strong>
                                <p>{review.createdAt.substring(0,10)}</p>

                            </div>

                            <p className="my-4">{review.comment}</p>
                            <Ratings value={review.rating}/>
                                
                    </div>
                ))}
            </div>


            </>

          )}
        </section>

        <section>
            {aisActive === 3 && (
                <section className="ml-[4rem] flex flex-wrap">
                    {!data ? (<Loader/>):(

                    data.map((product)=>(


                        <div key={product._id}>
                            <SmallProduct product={product}/>
                        </div>
                    ))
                    )}
                </section>

            )}
        </section>
    </div>
  )
}

export default ProductTabs