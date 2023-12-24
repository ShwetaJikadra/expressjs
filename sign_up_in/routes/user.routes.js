const express=require('express')
const userRoutes=express.Router();
const {signin,signup,getUser,updateUser,deleteUser, resetPassword}=require('../controller/user.controller');
const { verifyToken } = require('../helpers/tokenverify');
userRoutes.post('/signin',signin);
userRoutes.post('/signup',signup);
userRoutes.get('/profile',verifyToken,getUser);
userRoutes.put('/update-profile',verifyToken,updateUser);
userRoutes.post('/reset-password',verifyToken,resetPassword)
module.exports=userRoutes;

