const express=require('express');
const orderRoutes=express.Router();
const {verifyToken}=require('../helpers/tokenverify');
const {addToOrder,cancelOrder, updateOrder, getOrder}=require('../controller/order.controller');
orderRoutes.post('/add-order',verifyToken,addToOrder);
orderRoutes.delete('/cancel-order',verifyToken,cancelOrder);
orderRoutes.put('/update-order',verifyToken,updateOrder);
orderRoutes.get('/:id',verifyToken,getOrder);
// orderRoutes.get('/get-order',verifyToken,getOrder);

module.exports=orderRoutes;