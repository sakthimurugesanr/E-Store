import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js"
import bcrypt from "bcryptjs"
import creatToken from '../utils/creatToken.js'

const creatUser = asyncHandler(async(req,res)=>{
    
        const {username, email, password} = req.body
       
if(!username|| !email || !password){
    res.status(400);
    throw new Error("please fill the all inputs.....");
}

const userExists = await User.findOne({email});
if(userExists){
    res.status(400);
    throw new Error("user already exists");


}

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password,salt)

const newUser = new User({username, email, password:hashedPassword});

try {
    await newUser.save();
    creatToken(res,newUser._id)
    res.status(201).json({_id: newUser._id,
        username: newUser.username,
         email: newUser.email,
         isAdmin:newUser.isAdmin})
} catch (error) {
    res.status(400)
    throw new Error("Invalid user Data")
}
})


const loginuser =asyncHandler(async(req,res)=>{
 
    const {email,password}=req.body

const ExistingUser = await User.findOne({email})

if(ExistingUser){
    const isValid = await bcrypt.compare(password,ExistingUser.password)
    if(isValid){
        creatToken(res,ExistingUser._id)
        res.status(200).json({_id: ExistingUser._id,
            username: ExistingUser.username,
             email: ExistingUser.email,
             isAdmin:ExistingUser.isAdmin})
    }

}
return;

})

const logoutuser = asyncHandler(async(req,res)=>{
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message:"Logout user Successfully"
    })

})

// get all users for admin only 
const getAllUser = asyncHandler(async(req,res)=>{

    const allUsers = await User.find({})
    res.status(200).json(allUsers)
})


const  getUserProfile = asyncHandler((async(req,res)=>{
    const user = await User.findById(req.user._id)
    if (user){
        res.status(200).json({
        _id:user._id,
        username:user.username,
        email:user.email,

        })

    }
    else{
        res.status(404).send('User is not found')
    }


}))

const updateUser = asyncHandler(async(req,res)=>{
      const user= await User.findById(req.user._id)

      if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
    
      if(req.body.password){
        const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password,salt)
        user.password = hashedPassword ;
      }

        const  fianlUpdate = await user.save();


        res.status(200).json({

            _id:fianlUpdate._id,
            username:fianlUpdate.username,
            email:fianlUpdate.email,
            isAdmin:fianlUpdate.isAdmin

        })

      }
      else{
        res.status(404).send('User is not found')
      }
        
      
    
})
const deleteUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
 if(user){

     if(user.isAdmin){
         res.status(400)
         throw new Error('Cannot delete admin user') 
 
        }
        await User.deleteOne({_id :user._id})
        res.json({message:"User Removed"})
    }
    else{
res.status(404)
throw new Error('User is not found')
    }
    


})
const getUserById = asyncHandler(async(req,res)=>{

    const userByid = await User.findById(req.params.id).select('-password')
    if(userByid){

        res.status(200).json(userByid)
    }
    else{
        res.status(404)
        throw new Error('User is not found')
    }



})
const updateById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    
    if (user){
        user.username= req.body.username|| user.username;
        user.email = req.body.email|| user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

   

   const updateuser = await user.save()
   res.json({
       _id:updateuser._id,
       username:updateuser.username,
       email:updateuser.email,
       isAdmin:updateuser.isAdmin
   })   
}else{
    res.status(404).send('User is not found')
}
     


})


export {creatUser,loginuser,
    logoutuser,getAllUser,
    getUserProfile,
    updateUser,
    deleteUserById,
    getUserById,
    updateById
};