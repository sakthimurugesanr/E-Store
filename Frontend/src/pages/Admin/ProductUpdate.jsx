import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"
import {useUpdateProductMutation,
        useDeleteProductMutation,
        useGetProductByIdQuery,
        useUploadProductImageMutation,
} from '../../Redux/api/productApiSlice'
import {useFetchCategoriesQuery} from '../../Redux/api/createCategorySlice'
import AdminMenu from "./adminMenu"
import { toast } from "react-toastify"


  
const ProductUpdate = () => {
const params = useParams()
    const {data: productData} = useGetProductByIdQuery(params._id);
    const [image,setImage] =useState(productData?.image|| "");
    const [name,setName] = useState(productData?.name|| " ");
    const [quantity,setQuantiy]=useState(productData?.quantity|| "")
    const [Price,setPrice]=useState(productData?.price)
    const [description,setDescription]=useState(productData?.description||"");
    const [categrory,setCategory]=useState(productData?.categrory||"");
    const [brand,setBrand] =useState(productData?.brand|| "");
    const [stock,setStocks]=useState(productData?.countInStock);

const navigate = useNavigate();

const {data: categories=[]} = useFetchCategoriesQuery();
const [updateProduct]= useUpdateProductMutation();
const [uploadProductImage]=useUploadProductImageMutation();
const [deleteProduct]=useDeleteProductMutation();

useEffect(()=>{
    if(productData && productData._id){
      setImage(productData.image)
        setName(productData.name)
        setDescription(productData.description)
        setPrice(productData.price)
        setQuantiy(productData.quantity)
        setCategory(productData.categories?._id)
        setBrand(productData.brand)
    }
},[productData])

const uploadFileHandler = async(e)=>{
  const formdata = new FormData()
  formdata.append("image",e.target.files[0])

  try {
    const res =  await uploadProductImage(formdata).unwrap()
    toast.success(`Item Updated successfully`);
    setImage(res.image)
    
  } catch (error) {

    toast.error(error?.data?.message|| error.error);
    
  }



}

 const handleSubmit = async(e)=>{
      e.preventDefault()
      
      try {
        const formData =  new FormData()
        formData.append('image',image)
        formData.append('name',name)
        formData.append('description',description)
        formData.append('price',Price)
        formData.append('category',categrory)
        formData.append('quantity',quantity)
        formData.append('brand',brand)
        formData.append('countInStocks',stock)

const {data} = await updateProduct({productId:params._id,formData})
console.log(data)
if(data.error){
  toast.error(data.error);
}
else{
  toast.success(`Product Suucessfully Updated`);
  navigate("/admin/allproducts");
}
        
      } catch (error) {
        console.error(error);
        toast.error("Product Update failed.Try again")
      }

    }

      const handleDelete = async()=>{
        try {
          let answer = window.confirm("are you sure you wnat to delete this product")
          if(!answer) return;

          const {data} = await deleteProduct(params._id)
          toast.error(`${data.name} is deleted`)
          navigate("/admin/allproducts")

          
        } catch (error) {
          console.error(error);
          toast.error("Product Delete failed.Try again")
          
        }
      }

  return (    
    
    <div className="container xl:mx-[8rem] sm:mx-[0] "> 

    <div className="flex flex-col md:flex-row">
          <AdminMenu/>
        <div className="md:w-3/4 p-3">
            <div className="h-12">Update & Delete Product</div>
            {image && (

                <div className="text-center ">
                  <img src={image}
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
    value={Price}
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
    value={stock} onChange={e=>setStocks(e.target.value)}
    />
  </div>

  <div>
            <label htmlFor="">Category</label><br/>
            <select type="text" placeholder="Select category" className=" rounded-lg  bg-[#101011] text-white p-3 mb-3 w-[30rem] "
            value={categrory} onChange={e=>setCategory(e.target.value)} >
{categories?.map((c)=>(
  <option key={c._id} value={c._id}>{c.name}</option>
))} 
            </select>
  </div>


</div>
  <div className="flex justify-center mt-5 "> 
    <button className="p-4 w-[10rem] bg-green-800 hover:bg-green-900 text-lg font-bold rounded-lg mr-[5rem]"
      onClick={handleSubmit}
    >
      Update
    </button>
    <button className="p-4 w-[10rem] bg-red-800 hover:bg-red-900 text-lg font-bold rounded-lg"
      onClick={handleDelete}
    >
      Delete
    </button>
  </div>
</div>


    </div>
    </div> 
  </div>
  
  )
}

export default ProductUpdate