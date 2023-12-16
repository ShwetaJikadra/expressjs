const express=require('express')
const userRoutes=express.Router();
const {signin,signup}=require('../controller/user.controller');
userRoutes.post('/signin',signin);
userRoutes.post('/signup',signup);
module.exports=userRoutes;

