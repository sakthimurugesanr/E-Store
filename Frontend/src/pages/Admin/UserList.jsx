import { useState,useEffect } from "react"
import {FaTrash,FaTimes,FaCheck,FaEdit} from 'react-icons/fa'
import { useGetAllusersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,} from '../../Redux/api/usersApiSlice'
import Loader from "../../components/Loader"
import Message from '../../components/Loader'
import { toast } from 'react-toastify';
import AdminMenu from "./adminMenu"

const UserList = () => {

 const {data:users,refetch,isLoading,error}= useGetAllusersQuery();

 const [deleteUser]= useDeleteUserMutation();
 const [updateUser]= useUpdateUserMutation();
 

 const [editableUserId,setEditableUserId] = useState(null);
 const [editableUserName,setEditableUseraName]= useState('');
 const [editableUserEmail,setEditableUserEmail]= useState('');


 useEffect(()=>{
    refetch();
 },[refetch]);




 const toggleEdit =(id,username,email)=>{
  setEditableUserId(id),
  setEditableUseraName(username),
  setEditableUserEmail(email)
 }


 const updateHandler = async(id)=>{
try {
  await updateUser(
    {userId: id,
    username:editableUserName,
    email:editableUserEmail}
  );
  setEditableUserId(null)
  refetch();
} catch (error) {
  toast.error(error?.data?.message || error.message)
}

 }

 const deletHandler = async(id)=>{
  if ( window.confirm("Are You sure")) {
      try {
        await deleteUser(id);
        
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
  } 
 

 }
  
  return (
    <div className="p-4">

      {isLoading ? <Loader/> : error ? <Message variant="danger">{error?.data?.message || error?.message}</Message> : (

          <div className="flex flex-col md:flex-row">
            <AdminMenu/>
            <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>  
              </thead>

              <tbody>
               {users.map(user=>(
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input type="text" value={editableUserName} onChange={e=>setEditableUseraName(e.target.value)} className="w-full p-2 boder rounded-lg"/>
                          <button onClick={()=>updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"><FaCheck/></button>
                        </div>

                      ) : (
                        <div className=" flex items-center">
                          {user.username} {" "}

                          <button onClick={()=>toggleEdit(user._id,user.username,user.email)}>
                            <FaEdit className="ml-[1rem]"/>
                          </button>

                        </div>
                      )}
                    </td>
                    <td>
                    {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input type="text" value={editableUserEmail} onChange={e=>setEditableUserEmail(e.target.value)} className="w-full p-2 boder rounded-lg"/>
                          <button onClick={()=>updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"><FaCheck/></button>
                        </div>

                      ) : (
                        <div className=" flex items-center">
                          <p>{user.email}</p>

                          <button onClick={()=>toggleEdit(user._id,user.username,user.email)}>
                            <FaEdit className="ml-[1rem]"/>
                          </button>

                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 ">

                      {user.isAdmin ? (
                        <FaCheck className="text-green-500"/>
                      )
                    :
                    (
                      <FaTimes className="text-red-500"/>
                    )
                    }
                    </td>
                    <td className="px-4 py-2">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button  onClick={()=>deletHandler(user._id)}className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 " >
                            <FaTrash className="font-2xl"/>
                          </button>
                          
                        </div>

                      )}
                    </td>
                  </tr>

               ))}
              </tbody>
          
            </table>

          </div>

      )}
    </div>
  )
}

export default UserList   