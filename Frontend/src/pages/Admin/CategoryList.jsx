import {useState} from 'react'
import {useCreateCateGoryMutation,
    useUpdatedCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,} from '../../Redux/api/createCategorySlice'
    import {toast} from 'react-toastify'
import CategoryForm from '../../components/CategoryForm';
import Model from '../../components/Model'
import AdminMenu from './adminMenu';


const CategoryList = () => {
  const {data:categories}=useFetchCategoriesQuery();
    const [name,setname]=useState('');
    const [selectCategory,setSelectcategory]=useState(null);
    const [updatingname,setUpdatingname]=useState('');
    const [modelVissible,setModelvissible]=useState(false);

  const [createCateGory] = useCreateCateGoryMutation();
   const [updatedCategory]= useUpdatedCategoryMutation();
   const [deleteCategory]= useDeleteCategoryMutation();

      
   
   const handleDeleteCategory = async()=>{

    try {
        const result = await deleteCategory(selectCategory._id).unwrap();

        if(result.error){
          toast.error(result.error)
        }
        else{
          toast.success(`${result.name} is Deleted`)
          setModelvissible(null);
          setSelectcategory(false);
        }

      
    } catch (error) {
      console.log(error);
      toast.error('Deleting catogory failed,try again')
      
      
    }
   }
   const handleCreateCategory =async(e)=>{
    e.preventDefault();
    
  
    if(!name){
      toast.error('Category Name is required')
      return
    }
  
    try {
      const result = await createCateGory({name}).unwrap()
      if(result.error){
        toast.error(result.error)
      }
      else{
        setname("");
        toast.success(`${result.name} Successfully Added `)
      }
      
    } catch (error) {
      console.log(error);
      toast.error('Creating catogory failed,try again')
      
      
    }
  }

  const handleUpdateCategory =async(e)=>{
        e.preventDefault();


        if(!updatingname){
          toast.error('Caegory name is required ')
          return;
          }

          try {
            const result = await updatedCategory({
                categotryId:selectCategory._id,
                updatedCategory:{name:updatingname}
            }).unwrap();

            if(result.error){
                  toast.error(result.error)
            }
            else{
              toast.success(`${result.name} is Updated`);
              setSelectcategory(null);
              setUpdatingname('');
              setModelvissible(false);
            }
            
          } catch (error) {
            console.log(error)
            
          }

  }
  return (
    <div className='xl:ml-[15rem] flex flex-col md:flex-row'>

      <div className='md:w-3/4 p-3 '>
      <div className='h-12'>Manage Categories</div>
      <AdminMenu/>
      <CategoryForm value={name} setvalue={setname} handleSubmit={handleCreateCategory}/>
      <br />
      <hr />
      <div className="flex fle-wrap">
    {categories?.map((category)=>(
      <div key={category._id}>
        <button className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" onClick={()=>{{
          setModelvissible(true);
          setSelectcategory(category)
          setUpdatingname(category.name)
        }}}>{category.name}</button>
      </div>
    )) }
      </div>
        <Model isOpen={modelVissible} isClose={()=>setModelvissible(false)} onClose={()=>setModelvissible(false)}>
          <CategoryForm value={updatingname} setvalue={(value)=>setUpdatingname(value)} 
          handleSubmit={handleUpdateCategory}
            buttonText="Update"
          handleDelete={handleDeleteCategory}
            />
        </Model>
      </div>
    </div>
  )
}

export default CategoryList