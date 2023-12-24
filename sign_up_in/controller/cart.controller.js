const { default: mongoose } = require('mongoose');
const Cart=require('../model/cart.model');
exports.addToCart=async (req,res)=>{
    try
    {
    const {cartItem,quantity}=req.body;
    let isCart=await Cart.findOne({user:req.user._id,cartItem:cartItem});
    if(isCart)
    {
        return res.json({message:'Item is already available'})
    }
  isCart=await Cart.create({
        user:req.user._id,
        cartItem,
        quantity
    });
    isCart.save();
    res.status(400).json({message:'cart added success'});
}
catch(error)
{
    console.log(error)
    res.status(400).json({message:'Internal server Error'})
}
}

exports.getAllCarts=async (req,res)=>{
    try{
               let cart=await Cart.find({user:req.user._id,isDelete:false});
               res.status(200).json(cart);
    }catch(error)
    {
        console.log(error)
    res.status(400).json({message:'Internal server Error'})
    }
}
exports.getCart=async (req,res)=>{
    try{

        let id=new mongoose.Types.ObjectId(req.query.cartId);
        let cartItem=await Cart.findById(id);
        if(!cartItem)
        {
            return res.json({message:'cart not found'});
        }
        res.status(500).json(cartItem)
    }catch(error)
    {
        console.log(error)
    res.status(400).json({message:'Internal server Error'})
    }
}
exports.updateCart=async (req,res)=>{
    try{
        const {quantity}=req.body;
        let isCart=await Cart.findOne({user:req.user._id});
        if(!isCart)
        {
            return res.json({message:'cart is not available for this User'});
        }
        isCart.quantity=quantity
        isCart.save();
        res.json({message:'update cart success'})
    }
    catch(error)
    {
        console.log(error)
    res.status(400).json({message:'Internal server Error'})
    }
}
exports.deleteCart=async (req,res)=>{
    try{
        let id=new mongoose.Types.ObjectId(req.query.cartId)
        let cart=await Cart.findOne({user:req.user._id,});
        if(!cart)
        {
            return res.status(200).json({message:'user has does not any cart'})
        }
        cart=await Cart.findOneAndUpdate(
            {_id:id},
            {
                $set:{isDelete:true}
            },
            {
                new:true
            }
        )
        cart.save();
        res.status(400).json({message:'delete success',cart})
    }
    catch(error)
    {
        console.log(error)
    res.status(400).json({message:'Internal server Error'})
    }
}