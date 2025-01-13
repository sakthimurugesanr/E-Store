import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authentiCate = asyncHandler(async(req,res,next)=>{

    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            const decode = jwt.verify(token,process.env.JWt_SECRET)
            req.user = await User.findById(decode.userId).select("-password");
            next();
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized')
            
        }

    }
    else{
        res.status(401); throw new Error("token is invalid , and not authorized")

    }  
})
const authorizeAdmin = (req,res,next)=>{
    if(req.user&& req.user.isAdmin){
        next();
    }
    else{
        res.status(401).send("Not authoried as an Admin")
    }

}
export {authentiCate,authorizeAdmin}
