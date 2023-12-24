
const express=require('express');
const cartRoutes=express.Router();
const {addToCart,getAllCarts,getCart,updateCart, deleteCart}=require('../controller/cart.controller');
const { verifyToken } = require('../helpers/tokenverify');
cartRoutes.post('/add-cart',verifyToken,addToCart);
cartRoutes.get('/all-carts',verifyToken,getAllCarts);
cartRoutes.get('/get-cart',verifyToken,getCart);
cartRoutes.put('/update-cart',verifyToken,updateCart)
cartRoutes.delete('/del-cart',verifyToken,deleteCart)

module.exports=cartRoutes;