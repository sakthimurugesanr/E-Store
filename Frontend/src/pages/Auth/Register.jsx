import React from 'react'
import { useState,useEffect } from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredientials } from '../../Redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../Redux/api/usersApiSlice'
// import {grey} from '../../components/assets/grey.jpg'
// import {lock} from '../../components/assets/lock.jpg'
import reg from '../../components/assets/register.jpg'


const Register = () => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState(''); 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[register,{isLoading}]=useRegisterMutation();
    const {userInfo} = useSelector((state)=>state.auth);

    const {search}=useLocation();
    const sp= new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/";

    useEffect(()=>{
        if(userInfo){
            navigate( )
        }

    },[userInfo,navigate,redirect])

    const submitHandler = async(e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error('password do not match')
        }
        else{
            try {
                const res = await register({username,email,password}).unwrap();
                dispatch(setCredientials({...res}));
                navigate(redirect);
                toast.success('Register Successfully');

                
            } catch (error) {
                console.log(error)
                toast.error(error.data.message)
            }
        }
    }
  return (
    <section className='pl-[10rem] flex flex-wrap'>
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className='text-2xl font-semibold mb-4'>Register</h1>

            <form onSubmit={submitHandler} className='container w-[40rem]'>
                <div className='my-[2rem]'>
                <label htmlFor='name' className='block text-sm font-medium text-white'>Name</label>
                <input type='text' id='name' className='mt-1 p-2 border-rounded w-full  border-2 bg-gray-200' placeholder='Enter Your Name' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className='my-[2rem]'>
                <label htmlFor='email' className='block text-sm font-medium text-white'>Email Address</label>
                <input type='email' id='email' className='mt-1 p-2 border-rounded w-full  border-2 bg-gray-200' placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='my-[2rem]'>
                <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
                <input type='password' id='password' className='mt-1 p-2 border-rounded w-full  border-2 bg-gray-200' placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='my-[2rem]'>
                <label htmlFor='confirmpassword' className='block text-sm font-medium text-white'>Confirm Password</label>
                <input type='password' id='confirmpassword' className='mt-1 p-2 border-rounded w-full  border-2 bg-gray-200' placeholder='Confirm Your Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>

                        <button disabled={isLoading} type='submit' className="bg-pink-500 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">

                            {isLoading ? "Registering..." : "Register"}
                        </button>
                        {isLoading && <Loader/>}
            </form>

            <div className='mt-4'>

                <p className='text-white'> Already have an account? {" "}

                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                <span className='text-pink-500 hover:underline hover:text-purple-700'>Login</span>
                </Link>

                </p>

            </div>



        </div>



        <div className="xl:w-[40rem] h-[20rem] relative top-[12rem] sm:w-full sm:h-[20rem] xsm:h-[20rem] xsm:w-full  ">

      <img src={reg} alt="img" className="w-full h-full object-cover  hover:scale-105  transition duration-150 hover:grayscale" />
    </div>


    </section>
  )
}

export default Register