// const express=require('express');
const user=require('../public/users.json');
exports.getAllUsers=(req,res)=>{
    res.json(user);
}
exports.getUser=(req,res)=>{
    const id=Number(req.params.id);
    const itm=user.find((p)=>p.id===id)
    console.log(itm);
    res.json(itm);
    res.status(400);

    
}
exports.addNewUser=(req,res)=>{
    const item=req.body;
    user.push(item);
    res.json({...req.body,id:id})
}
exports.replaceUser=(req,res)=>{
    const id=+req.params.id;
    const itemIndex=req.body;
    user.splice(itemIndex,1,{...req.body,id:id});
    res.json({message:"replace data success"})

}
exports.updateUser=(req,res)=>{
    const id=+req.params.id;
    const itemIndex=req.body;
    user.splice(itemIndex,1,{...req.body,id:id});
    res.json({message:"update data success"});

}

exports.deleteUser=(req,res)=>
{
    const id= Number(req.params.id);
    const itemIndex=user.findIndex((p)=>p.id === id);
    let item=product[itemIndex]
    item=user.splice(itemIndex,1);
    // console.log(itemIndex)
    
        res.status(404).json({ message: 'Product is delete',product:item });

};