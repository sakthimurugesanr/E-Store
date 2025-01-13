import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { setCredientials } from '../../Redux/features/auth/authSlice';
import { Link } from 'react-router';
import { useProfileMutation } from '../../Redux/api/usersApiSlice'
const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);

  }, [userInfo.username, userInfo.email])
  const dispatch = useDispatch();

  const submitHandler = async (e)=>{
    e.preventDefault();
    if(password !== cpassword){
      toast.error('Password do not match')

    }
    else{
      try {
        const res = await updateProfile({
          _id : userInfo._id,
          username,
          email,
          password,
        }).unwrap()

        dispatch(setCredientials({...res}))
        toast.success("Profile Updated Successfully!!")
        
      } catch (error) {
        toast.error(error?.data?.message || error.message)
        
      }
    }
    }

  return (

    <div className=' container mx-auto p-4 mt-[8rem]'>
      <div className='flex justify-center align-center md:flex md:space-x-4'>
        <div className='w-1/3 '>

          <h1 className='font-semibold text-2xl mb-4'>Updated Profile</h1>
          <form onSubmit={submitHandler}>
            <div className='mb-4'>
              <label className='block text-pink-700 mb-2'>Name</label>
              <input type="text"
                placeholder='Enter the name'
                className='form-input p-4 rounded-sm w-full bg-gray-100'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-pink-700 mb-2'>Email</label>
              <input type="text"
                placeholder='Enter the Email'
                className='form-input p-4 rounded-sm w-full bg-gray-100'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-pink-700 mb-2'>Password</label>
              <input type="password"
                placeholder='Enter the Password'
                className='form-input p-4 rounded-sm w-full bg-gray-100'
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-pink-700 mb-2'>Confirm Password</label>
              <input type="password"
                placeholder='Confirm password'
                className='form-input p-4 rounded-sm w-full bg-gray-100'
                onChange={(e)=>setCpassword(e.target.value)}
              />
            </div>
            <div className='flex justify-between mt-2px'>
              <button type='submit' className='bg-pink-700 text-white px-4 py-2 rounded-sm hover:bg-pink-600'>Submit</button>
              <Link  to='/user-order'className='bg-pink-700 text-white px-4 py-2 rounded-sm  hover:bg-pink-600'>MyOrder</Link>
               
            </div>
          </form>
          {loadingUpdateProfile && <Loader/>}
        </div>
      </div>

    </div>
  )
}

export default Profile