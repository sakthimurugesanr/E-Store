import { useGetTopPRoductsQuery } from "../../Redux/api/productApiSlice"
import Message from '../../components/Message'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'

import {FaBox,
FaClock,
FaShoppingCart,
FaStar,
FaStore
} from 'react-icons/fa'

const ProductCarousel = () => {
    const {data:products,error,isLoading}=useGetTopPRoductsQuery();
    console.log(products);
    

    const settings={
        dots:false,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToscroll:1,
        arrows:true,
        autoplay:true,
        autoplaySpeed:3000,

    }
  return (
    <div className="mb-4 xl:flex lg:flex md:flex mx-auto">
        {isLoading ? null : error ? (

            <Message variant="danger">{error?.data?.message || error.message}</Message>
        ):(

            <Slider {...settings} className="xl:w-[45rem] lg:w-[50rem] md:w-[56rem] sm:block items-center my-[0.6rem] ml-[1rem]">

            {products.map(({image,_id,name,price,description,brand,createdAt,numReviews,rating,quantity,countInStock})=>(
                    <div key={_id}>
                            <img src={image} alt={name} className="w-full rounded-lg object-cover"/>

                            <div className="flex justify-between w-[29rem] ">
                                <div className="one ">
                                    <h2>{name}</h2>
                                    <p>${price}</p> <br />
                                    <p>{description.substring(0,100)}...</p>
                                </div>

                                <div className="flex justify-between w-[20rem]">

                                <div className="two  ml-[8rem] mt-[1rem]">
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaStore className="mr-2 tetx-white"/>Brand: {brand}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaClock className="mr-2 tetx-white"/>Added: {" "}
                                        {moment(createdAt).format("DD/MM/YYYY")}
                                    </h1>
                                    <h1 className="flex items-center mb-6 w-[15rem]">
                                        <FaStar className="mr-2 tetx-white"/>Reviews: {numReviews}
                                    </h1>
                                        
                                </div>

                                <div className="two">
                                        <h1 className="flex items-center mb-6 w-5[rem] mt-[1rem]">
                                            <FaStar className="mr-2 tetx-white"/>Ratings:{""}{Math.round(rating)}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-5[rem] mt-[1rem]">
                                            <FaShoppingCart className="mr-2 tetx-white"/>Quantity:{quantity}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-5[rem] mt-[1rem]">
                                            <FaBox className="mr-2 tetx-white"/>Stocks:{""}{countInStock}
                                        </h1>
                                </div>
                                </div>

                            </div>
                    </div>
            ))      

            }

            </Slider>
        )}

    </div>
  )
}

export default ProductCarousel