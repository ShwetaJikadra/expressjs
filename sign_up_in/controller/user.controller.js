const express=require('express');
const app=express();
const User=require('../model/user.model');

const jwt=require('jsonwebtoken');



const bcrypt=require('bcrypt')

exports.signin=async (req,res)=>{
    try{
    const {email,password}=req.body;
    var user= await User.findOne({email:email,isDelete:false})
    if(!user){
        return res.json({message:'user not found'})
    }
    else{
        var checkpass=await bcrypt.compare(password,user.password)
        if(!checkpass)
        {
            return res.json({message:'password does not matched'})
        }
        let payload={
            userId:user._id
        }
        let token=jwt.sign(payload,process.env.SECRET_KEY)
        // else{
            res.status(200).json({token, message:'login success'})
        // }
        
    }
}
    catch(err)
    {
    console.log(err)
    res.status(500).json({message:'internal server error'})
    }
}
exports.signup=async (req,res)=>{
    try{
    const {username,age,gender,email,dob,password}=req.body;
    var user=await User.findOne({email:email,isDelete:false})
    if(user){
        return res.json({message:'user does already available'});

    }
    else
    {
        let hashPassword=await bcrypt.hash(password,10);
        console.log(hashPassword);
        user=await User.create({username,age,gender,email,dob,password:hashPassword});
        user.save();
        res.status(201).json({user,message:'user added signup success'})
    }
}
catch(err)
{
console.log(err)
res.status(500).json({message:'internal server error'})
}

}


exports.getUser=async(req,res)=>{
    try{
        res.json(req.user)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
}

exports.updateUser=async (req,res)=>{
    try{
     let user=await User.findByIdAndUpdate(req.user._id,{$set:{...req.body}},{new:true})
     res.status(200).json({user,message:'User is Updated'});

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'Internal server Error'});
    }
};


exports.resetPassword=async (req,res)=>{
    try{
        
        const {cur_pass,new_pass,con_pass}=req.body;
        var checkpass=await bcrypt.compare(cur_pass,req.user.password)
        if(!checkpass)
        {
            return res.json({message:'password is incorrect'})
        }
        if(new_pass !=con_pass)
        {
            return res.json({message:'please confirm password '})
        }
        let hashPassword=await bcrypt.hash(new_pass,10);
        let user=await User.findByIdAndUpdate(req.user._id,{$set:{password:hashPassword}})
    //    console.log(user.password)
        res.json({message:'password reset success',new_pass});
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:"internal server error"})
    }
}