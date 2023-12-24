const express=require('express');
const orderRoutes=express.Router();
const {verifyToken}=require('../helpers/tokenverify');
const {addToOrder}=require('../controller/order.controller');
orderRoutes.post('/add-order',verifyToken,addToOrder);
module.exports=orderRoutes;