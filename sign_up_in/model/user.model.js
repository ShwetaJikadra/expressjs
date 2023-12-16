// const express=require('express');

const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    gender:{
         type:String,
         require:true,
         eval:["male","female"]
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    dob:
    {
        type:Date,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})
const user1=mongoose.model('users',userSchema)
module.exports=user1;