import React from 'react'
import './Navigation.css'
import { useState } from 'react'
import {AiOutlineHome,AiOutlineShopping,AiOutlineLogin,AiOutlineUserAdd,AiOutlineShoppingCart} from 'react-icons/ai'
import {FaHeart} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../Redux/api/usersApiSlice'
import { logOut } from '../../Redux/features/auth/authSlice'
import FavoritesCount from '../products/FavoritesCount'

const Navigation = () => {
  const {userInfo} =useSelector(state =>state.auth)
  const {cartItems} =useSelector(state =>state.cart)

  const [dropdownOpen,setDropdownOpen]= useState(false);
  const [showSidebar,setShowSidebar]= useState(false);

  const toggleDropDown=()=>{
    setDropdownOpen(!dropdownOpen)
  }
  const roggleSidebar=()=>{
    setShowSidebar(!showSidebar)
  }

  const closeSideBar=()=>{
    setShowSidebar(false)  
  }
  const dispach = useDispatch();
  const navigate=useNavigate();
  const [logoutApiCall]=useLogoutMutation();

  const logOutHandler =async()=>{
    try {
await logoutApiCall().unwrap();
      dispach(logOut())
      navigate('/login')
      
    } catch (error) {
      console.log(error)
    }
    }
            {userInfo ?( <span className='text-white'>{userInfo.username}</span>) : (<> </>)}
    // console.log("this",userInfo)
  return (
    <div
     style={{zIndex:999}} 
    className={`${
      showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 *
    text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`} id='navigation-container'>

        <div className="flex flex-col justify-center space-y-4">
          <Link to="/" className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineHome className='mr-2 mt-[3rem]' size={26}/>
          <span className=' hidden  nav-item-name mr-2 mt-[3rem]'>HOME</span>
          </Link>
          <Link to="/shop" className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineShopping className='mr-2 mt-[3rem]' size={26}/>
          <span className=' hidden  nav-item-name mr-2 mt-[3rem]'>SHOP</span>
          </Link>
          <Link to="/cart" className='flex items-center transition-transform transform hover:translate-x-2 relative'>
          <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26}/>
          <span className=' hidden  nav-item-name mr-2 mt-[3rem]'>CART</span>
          <div className='absolute top-9'>
            {cartItems.length > 0 &&(
                <span>
                  <span className="px-1 py-0 text-sm text-white bg-pink-700 rounded-full">
                    {cartItems.reduce((a,c)=>a+c.qty,0)}
                  </span>
                </span>
            )}

          </div>
          </Link>

          <Link to="/favorite" className='flex items-center transition-transform transform hover:translate-x-2'>
          <FaHeart className=' mr-2  mt-[3rem]' size={20}/>
          <span className=' hidden  nav-item-name mr-2 mt-[3rem]'>FAVORITE</span>{""}
          <FavoritesCount/>
          </Link>
        </div>

        <div className="relative">
          <button onClick={toggleDropDown} className=" flex items-center text-gray-8000 focus:outline-none">
            {userInfo ?( <span className='text-white'>{userInfo.username}</span>) : (<> </>)}

          {userInfo && (
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
            </button>
        
          {dropdownOpen && userInfo && (
            <ul className={`absolute  mt-2 ml-14 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-40 ": "-top-80"}`}
            >
              
              {userInfo.isAdmin && (
                <>
                <li>
                  <Link to='/admin/dashboard' className='block px-4 py-2 hover:bg-gray-100'>
                  Dashboard
                  </Link>
                </li>
                <li>
                  <Link to='/admin/productlists' className='block px-4 py-2 hover:bg-gray-100'>
                  Productlists
                  </Link>
                </li>
                <li>
                  <Link to='/admin/category' className='block px-4 py-2 hover:bg-gray-100'>
                  Category
                  </Link>
                </li>
                <li>
                  <Link to='/admin/userslist' className='block px-4 py-2 hover:bg-gray-100'>
                  Users
                  </Link>
                </li>
                </>
              )}
                <li>
                  <Link to='/profile' className='block px-4 py-2 hover:bg-gray-100'>
                  Profile
                  </Link>
                </li>
                <li>
                  <button  className='block px-4 py-2 w-full text-left hover:bg-gray-100' onClick={logOutHandler}>
                  Logout
                  </button>
                </li>
                </ul>
              
              )}

            {!userInfo && (
        <ul>
          <li>
          <Link to="/login" className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineLogin className='mr-2 mt-[3rem]' size={26}/>
          <span className=' hidden  nav-item-name mr-2 mt-[3rem]'>Login</span>
          </Link>
            
          </li>
          <li>
          <Link to="/register" className='flex items-center transition-transform transform hover:translate-x-2'>
          <AiOutlineUserAdd  className='mr-2 mt-[3rem]' size={26}/>
          <span className=' hidden  nav-item-name mr-2 mt-[3rem]'>Register</span>{" "}
          </Link>
            
          </li>
        </ul>
            )}
    </div>
    </div>

  )
}

export default Navigation 