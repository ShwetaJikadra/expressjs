const mongoose = require('mongoose');
const Order=require('../model/order.model');
const Cart=require('../model/cart.model');
exports.addToOrder=async (req,res)=>{
    try{
              let cartItems=await Cart.find({user:req.user._id,isDelete:false}).populate('cartItem');
              let orderItems=cartItems.map((item)=>({
                cartItem:item.cartItem._id,
                quantity:item.quantity,
                price:item.cartItem.price
              }));
              let   totalPrice=orderItems.reduce(((total,item)=>total+=(item.quantity*item.price)),0);
              let newOrder=await Order.create({
                user:req.user._id,
                items:orderItems,
                totalAmount:totalPrice
              });
              newOrder.save();
              await Cart.updateMany({user:req.user._id},{isDelete:true});
              res.status(201).json({order:newOrder,message:'Order placed'});

    }
    catch(error){
        console.log(error);
        res.status(200).json({message:'Internal server error'})
    }
};
exports.cancelOrder = async (req, res) => {
  try {
    let id = new mongoose.Types.ObjectId(req.query.orderId);

    let order = await Order.findOne({_id:id,user:req.user._id});

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await Order.updateMany({ _id: id}, { isDelete: true });
 
     order.save();
    res.json({ message: 'Order canceled', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateOrder=async (req,res)=>{
  try{
  let id = new mongoose.Types.ObjectId(req.query.orderId);
  let {cartItemID,quantity}=req.body;
  let order = await Order.findOne({_id:id,user:req.user._id});

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  let item = await Cart.findOne({_id:cartItemID,user:req.user._id});
  if(!item)
  {
    return res.status(404).json({ message: 'Invalid item,this item not available in Cart ' });
  }
}
catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
}