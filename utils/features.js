import mongoose from "mongoose";
import { serialize } from "cookie";
import { User } from "@/model/user";
var jwt = require('jsonwebtoken');
// import { jwt } from "jsonwebtoken";

export const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        dbName:'NextTodo'
    })
    console.log('database connected');
}

export const cookieSetter=(res,token,set)=>{
    res.setHeader(
        'Set-Cookie',serialize('token',set?token:'',{
            path:'/',
            httpOnly:true,
            maxAge:set?15*24*60*60*1000:0
        })
    )
}

export const generateToken=(_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET);
}

export const checkAuth=async(req)=>{
    // console.log(req.headers.cookie);
    const cookie=req.headers.cookie;
    // console.log(cookie);
    if(!cookie) return null;
    const token=cookie.split('=')[1];
    // console.log(token);
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    // console.log(decode);
    return await User.findById(decode._id);
}