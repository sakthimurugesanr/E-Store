import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import { NavLink } from "react-router"

const AdminMenu = () => {

    const [ismenuOpen,setisMenuOpen] = useState(false)
    const toggle = ()=>{
        setisMenuOpen(!ismenuOpen)

} 


  return (
    <>
    <button className={`${ismenuOpen ? 'top-2 right-2':'top-5 right-7'} bg-[#151515] p-2 fixed rounded-lg`} onClick={toggle}>
        {ismenuOpen ? (
            <FaTimes color="white"/>

        ):(
            <>
            <div className="w-6 h-0.5 bg-gray-500 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-500 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-500 my-1"></div>
            </>
        )}
         </button>

         {ismenuOpen && (
            <section className="bg-[#151515] p-4 fixed right-7 top-5]">
                <ul className="list-none mt-2">
                    <li>
                        <NavLink className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm" to="/admin/dashboard" 
                            style={({isActive})=>({
                                color: isActive ? "greenyellow" : "white"
                            })}
                        >
                            Admin Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm" to="/admin/category" 
                            style={({isActive})=>({
                                color: isActive ? "greenyellow" : "white"
                            })}
                        >
                            Create Category
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm" to="/admin/productlists" 
                            style={({isActive})=>({
                                color: isActive ? "greenyellow" : "white"
                            })}
                        >
                            Create Product
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm" to="/admin/allproducts" 
                            style={({isActive})=>({
                                color: isActive ? "greenyellow" : "white"
                            })}
                        >
                            All Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm" to="/admin/userslist" 
                            style={({isActive})=>({
                                color: isActive ? "greenyellow" : "white"
                            })}
                        >
                            Manage Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm" to="/admin/orderlist" 
                            style={({isActive})=>({
                                color: isActive ? "greenyellow" : "white"
                            })}
                        >
                            Manage Orders
                        </NavLink>
                    </li>

                </ul>

            </section>
         )}
    </>
  )
}

export default AdminMenu