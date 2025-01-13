import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import {useCreateProductMutation,
    useUploadProductImageMutation,
} from "../../Redux/api/productApiSlice"

import { useFetchCategoriesQuery } from "../../Redux/api/createCategorySlice"
import AdminMenu from "./adminMenu"


const ProductLis = () => {
    const [image,setImage] = useState(null);
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [quantity,setQuantiy]=useState('');
    const [brand,setBrand]=useState('')
    const [stocks,seStocks]=useState(0)
    const [imageUrl,setImageUrl]=useState(null)

    const navigate =useNavigate();

    const [ createProduct] = useCreateProductMutation();
    const [uploadProductImage] = useUploadProductImageMutation();
    const {data:categories}=useFetchCategoriesQuery();

    const uploadFileHandler = async(e)=>{
      const formdata = new FormData()
      formdata.append('image',e.target.files[0])

      try {const res = await uploadProductImage(formdata).unwrap()
        toast.success(res.message)
        setImage(res.image)
        setImageUrl(res.image)
      } catch (error) {
        toast.error(error?.data?.message|| error.error)
        
      }

    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      
      try {
        const producData = new FormData()
        producData.append('image',image)
        producData.append('name',name)
        producData.append('description',description)
        producData.append('price',price)
        producData.append('category',category)
        producData.append('quantity',quantity)
        producData.append('brand',brand)
        producData.append('countInStocks',stocks)

const {data} = await createProduct(producData)
console.log(data)

if(data.error){
  toast.error("Product create failed.Try again")
}
else{
  toast.success(`${data.name} is created`)
  navigate("/");
}
        
      } catch (error) {
        console.error(error);
        toast.error("Product create failed.Try again")
      }

    }
    
  return <div className="container xl:mx-auto  sm:mx-[0]"> 

    <div className="flex flex-col md:flex-row">
          <AdminMenu/>
        <div className="md:w-3/4 p-3">
            <div className="h-12">Create Categories</div>
            {imageUrl && (

                <div className="text-center ">
                  <img src={imageUrl}
                   alt="product" 
                   className="block mx-auto max-h-[200px]"/>
                </div>
              )
            }
<div className="mb-3">
  <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
    {image ? image.name : " Upload Image"}
    <input type="file" name="image" accept="image/*" className={!image ? "hidden" : "text-white"}
    onChange={uploadFileHandler} 
    />
  </label>
</div>

<div className="p-3 ">
<div className="flex flex-wrap justify-between ">
  <div className="one">
    <label htmlFor="name">Name</label><br/>
    <input type="text" className="bg-[#101011] border rounded-lg w-[30rem] text-white"
    value={name}
    onChange={e=>setName(e.target.value)}
    />
    
  </div>
  <div className="two ml-5">
    <label htmlFor="name block">Price</label><br/>
    <input type="Number" className="bg-[#101011] border rounded-lg w-[30rem] text-white"
    value={price}
    onChange={e=>setPrice(e.target.value)}
    />
    
  </div>
</div>
<div className="flex flex-wrap  justify-between ">
  <div className="one ">
    <label htmlFor="name block">Quantity</label><br/>
    <input type="number" className="bg-[#101011] border rounded-lg w-[30rem] text-white"
    value={quantity}
    onChange={e=>setQuantiy(e.target.value)}
    />
    
  </div>
  <div className="two ml-5">
    <label htmlFor="name block">Brand</label><br/>
    <input type="text" className="bg-[#101011] border rounded-lg w-[30rem] text-white"
    value={brand}
    onChange={e=>setBrand(e.target.value)}
    />
    
  </div>
</div >


<div className="my-5">

<label htmlFor="name block" >Description</label>
<textarea type="text" className="p-2 mb-3  bg-[#101011] text-white w-[69rem] border rounded-lg"
value={description} onChange={e=>setDescription(e.target.value)}
></textarea>
</div>

<div className="flex justify-between">
  <div>

    <label htmlFor="name block"> Count in stock</label><br/>
    <input type="text" className=" rounded-lg bg-[#101011] text-white p-3 mb-3 w-[30rem] "
    value={stocks} onChange={e=>seStocks(e.target.value)}
    />
  </div>

  <div>
            <label htmlFor="">Category</label><br/>
            <select type="text" placeholder="Select category" className=" rounded-lg  bg-[#101011] text-white p-3 mb-3 w-[30rem] "
            value={category} onChange={e=>setCategory(e.target.value)} >
{categories?.map((c)=>(
  <option key={c._id} value={c._id}>{c.name}</option>
))}
            </select>
  </div>


</div>
  <div className="flex justify-center mt-5"> 
    <button className="p-4 w-[10rem] bg-pink-800 hover:bg-pink-900 text-lg font-bold rounded-lg"
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
</div>


    </div>
    </div> 
  </div>
  
}

export default ProductLis