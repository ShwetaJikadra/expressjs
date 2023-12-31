const mongoose = require("mongoose");
const Order = require("../model/order.model");
const Cart = require("../model/cart.model");
const cartModel = require("../model/cart.model");
exports.addToOrder = async (req, res) => {
  try {
    let cartItems = await Cart.find({
      user: req.user._id,
      isDelete: false,
    }).populate("cartItem");
    let orderItems = cartItems.map((item) => ({
      cartItem: item.cartItem._id,
      quantity: item.quantity,
      price: item.cartItem.price,
    }));
    let totalPrice = orderItems.reduce(
      (total, item) => (total += item.quantity * item.price),
      0
    );
    let newOrder = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: totalPrice,
    });
    newOrder.save();
    await Cart.updateMany({ user: req.user._id }, { isDelete: true });
    res.status(201).json({ order: newOrder, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Internal server error" });
  }
};
exports.cancelOrder = async (req, res) => {
  try {
    let id = new mongoose.Types.ObjectId(req.query.orderId);

    let order = await Order.findOne({ _id: id, user: req.user._id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await Order.updateMany({ _id: id }, { isDelete: true });

    order.save();
    res.json({ message: "Order canceled", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id, quantity, cartItem } = req.body;

    let order = await Order.findOne({ user: req.user._id, _id: id });
    if (!order) {
      return res.json("You have not any order");
    }
    order = await Cart.findOne({
      cartItem: cartItem,
      isDelete: true,
    });
    if (!order) {
      return res.json("Item is not ordered You");
    }
    order = await Cart.updateOne(
      { cartItem: cartItem },
      {
        $set: { quantity: quantity },
      },
      { new: true }
    );

    order = await Cart.find({ user: req.user._id, isDelete: true }).populate(
      "cartItem"
    );

    let orderItem = order.map((item) => ({
      cartItem: item.cartItem._id,
      quantity: item.quantity,
      price: item.cartItem.price,
    }));

    let totalPrice = orderItem.reduce(
      (total, item) => (total += item.quantity * item.price),
      0
    );

    let updateOrder = await Order.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: { items: orderItem, totalAmount: totalPrice },
      },
      { new: true }
    );

    updateOrder.save();
    res.json({ message: "update order success", updateOrder });
  } catch (err) {
    console.log(err);
    res.json("Internal server error");
  }
};

exports.getOrder=async(req,res)=>
{
    try{
    const id= req.params.id;
    const order=await Order.findOne({user:req.user._id,isDelete:false,_id:id})
    if(order ===null)
    {
      return res.json({message:'you not  orderd this item'});
    }
    res.json(order);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

