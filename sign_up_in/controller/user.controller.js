const express=require('express');
const app=express();
const User=require('../model/user.model');



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
        else{
            res.status(200).json({message:'login success',user})
        }
        
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