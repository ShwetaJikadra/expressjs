const express=require('express');
const orderRoutes=express.Router();
const {verifyToken}=require('../helpers/tokenverify');
const {addToOrder,cancelOrder}=require('../controller/order.controller');
orderRoutes.post('/add-order',verifyToken,addToOrder);
orderRoutes.delete('/cancel-order',verifyToken,cancelOrder)
module.exports=orderRoutes;