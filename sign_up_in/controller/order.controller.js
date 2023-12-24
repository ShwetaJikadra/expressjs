const Order=require('../model/order.model');
const Cart=require('../model/cart.model');
exports.addToOrder=async (req,res)=>{
    try{
              let cartItems=await Cart.find({user:req.user._id,iesDelete:false}).populate('cartItem');
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
              await Cart.updateMany({user:req.user._id},{iesDelete:true});
              res.status(201).json({order:newOrder,message:'Order placed'});

    }
    catch(error){
        console.log(error);
        res.status(200).json({message:'Internal server error'})
    }
};

