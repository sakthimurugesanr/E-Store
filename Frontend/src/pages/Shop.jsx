import {useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {useGetFilteredProductsQuery} from '../Redux/api/productApiSlice'

import {setCategories,setChecked,setProducts}from '../Redux/features/shop/shopSlice'
import {useFetchCategoriesQuery} from '../Redux/api/createCategorySlice'
import Loader from '../components/Loader'
import ProductCart from './products/ProductCart'
const Shop = () => {
    const dispatch = useDispatch();
    const {categories,radio,checked,products}=useSelector((state)=>state.shop)
    const categoriesQuery = useFetchCategoriesQuery()
    const [priceFilter,setPriceFilter]=useState('');
    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio
      
    })

        useEffect(()=>{
            if(!categoriesQuery.isLoading){
                dispatch(setCategories(categoriesQuery.data))
                
            }
        },[categoriesQuery.data,dispatch])



        useEffect(()=>{
                if(!checked.length || !radio.length){
                    if(!filteredProductsQuery.isLoading){
                             
                            // const filteredPRoducts = filteredProductsQuery.data.filter((product)=>{ 
                            //         return(
                            //             product.price.toString().includes(priceFilter) ||
                            //             product.price === parseInt(priceFilter,10 )
                            //         )
                            // })
                            const filteredPRoducts = filteredProductsQuery.data.filter((product) => { 
                                return (
                                    product.price && product.price.toString().includes(priceFilter) ||
                                    product.price === parseInt(priceFilter, 10)
                                )
                            });
                            dispatch(setProducts(filteredPRoducts))
                    }
                }
        },[checked,dispatch,filteredProductsQuery.data,priceFilter,radio])


        const handleBrandClick =(brand)=>{
            const productsBybrand = filteredProductsQuery.data?.filter((product)=>product.brand === brand)
            dispatch(setProducts(productsBybrand))
        }

        const handleCheck = (value,id)=>{
            const updatedChecked = value ? [...checked, id ] : checked.filter((c)=>c!== id )
            dispatch(setChecked(updatedChecked))
        }


        // add All Brands options to uniqueBrands

        const uniqueBrands = [
            ...Array.from(
                new Set(filteredProductsQuery.data ?.map((product)=>product.brand).filter((brand)=> brand !== undefined))
            )
        ]


        const handlePriceChange = e =>{
                    setPriceFilter(e.target.value)
        }
        console.log("category",categories)
        console.log("products",products)
  return (
<>
    <div className='container mx-auto '>
                    <div className="flex md:flex-row ">

                    <div className='bg-[#151515] p-3 mt-2 mb-2'>

                        <h2 className='h4 text-center py-2 bg-black rounded-full mb-2'>
                            Filtered by Categories
                        </h2>

                        <div className='p-5 w-[15rem]'>
                            {/* {cateories?.map((c)=>(
                                <div className='mb-2' key={c._d}>
                                    <div className='flex items-center mr-4'>
                                        <input type='checkbox' id='red-checkbox' onChange={(e)=> handleCheck(e.target.checked, c._id)} />
 
                                    </div>
                                </div>
                            ))} */}
                            
                            {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                  
                </div>
              ))}
                        </div>

                        <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by Brands
            </h2>                  
            <div className="p-5">
                {uniqueBrands?.map((brand)=>(
                    <>
                    <div className="flex items-enter mr-4 mb-5">
                        <input type="radio" id={brand} name="brand" onChange={()=>handleBrandClick(brand)} />
                    <label htmlFor="pink-radio" className="ml-2 text-sm font-medium text-white dark:text-gray-300">{brand}</label>
                    </div>

                    </>
                ))}

            </div>
                    <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filer by Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 bg-black text-white placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>
            <div className="p-5 pt-0">
            <button className="w-full border my -4 " onClick={()=>window.location.reload()}>
                Reset
            </button>
            </div>
                    </div>

                    <div className="p-3">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" >
                    <ProductCart p={p}  />
                  </div>
  ))
)}
</div>
</div>

                    </div>
    </div> 
</> 
  )
}

export default Shop