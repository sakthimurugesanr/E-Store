import React from 'react'
import { useState,useEffect } from 'react';
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { useLoginMutation } from '../../Redux/api/usersApiSlice';
import { setCredientials } from '../../Redux/features/auth/authSlice';
import { useSelector,useDispatch } from 'react-redux';
import {toast} from 'react-toastify'
import Loader from '../../components/Loader';
import grey from '../../components/assets/grey.jpg'
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const dispach = useDispatch();
    const navigate = useNavigate();


    const [login,{isLoading}]= useLoginMutation();

    const {userInfo}=useSelector(state=>state.auth)

    const {search}=useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';



    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }

    },[navigate,redirect,userInfo])

    const submitHandler = async(e)=>{
        e.preventDefault();

        try {
            const res = await login({email,password}).unwrap();
            console.log(res)
            dispach(setCredientials({...res}))
        } catch (error) {
            toast.error(error?.data?.message || error.message)
            
        }
    }
  return (
    <div className='pl-[10rem] flex flex-wrap '>
        <div className='mr-[4rem] mt-[5rem]'>
            <h1 className='text-2xl font-semibold mb-4'>Sign In</h1>

            <form  onSubmit={submitHandler}className='container w-[40rem]'>
                <div className="my-[2rem]">
                    <label className='block font-medium text-white'>Email Address</label>
                    <input className='mt-1 p-2 border-rounded  w-full border-2 ' type='email' id='email' value={email} onChange={e=> setEmail(e.target.value)}/>
                </div>
                <div className="my-[2rem]">
                    <label className='block font-medium text-white'>Password</label>
                    <input className='mt-1 p-2 border-rounded  w-full border-2 ' type='Password' id='Password' value={password} onChange={e=> setPassword(e.target.value)}/>
                </div>

                <button disabled={isLoading} type='submit' className='bg-purple-800 text-white py-2 px-4 rounded cursor-pointer my-[1rem]'>{isLoading ? 'Signing in...' : 'Sign in'}</button>
                        {isLoading && <Loader/>}
            </form>
                <div className="mt-4">
                    <p className='text-white'>
                        New Customer ? {" "}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-purple-800 hover:underline hover:text-pink-700' >Register</Link>
                    </p>
                </div>

        </div>

        <div className="xl:w-[40rem] h-full relative top-[8rem] sm:w-full sm:h-[20rem] xsm:h-[20rem] xsm:w-full  ">
        
              <img src={grey} alt="img" className="w-full h-full object-cover hover:scale-110 transition duration-150" />
            </div>



    </div>
  ) 
}

export default Login;