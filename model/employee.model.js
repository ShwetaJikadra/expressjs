const express=require('express')
const { Schema, default: mongoose } = require('mongoose')
const employeeSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    age:
    {
        type:String,
        require:true,

    },
    deg:{
        type:String,
        require:true
    },
    address:{
        type:[String]
    },
    gender:{
        type:String,
        require:true,
        eval:['male','female']
    }
});
const employee=mongoose.Model('employees',employeeSchema)
module.exports=employee;

