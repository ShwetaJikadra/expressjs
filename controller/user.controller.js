// const express=require('express');
// const user=require('../public/users.json');
const  User=require('../model/user.model');
exports.getAllUsers=async (req,res)=>{
try{
    let user=await User.find({isDelete:false});
    
        res.json(user);
}
catch(err)
{
    console.log(err);
res.status(500).json({message:'Internal server error'})
}
    
}
exports.getUser=async (req,res)=>{
    
    try{
            const id=req.params.id;
            const user=await User.findById(id);
            res.json(user);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:'internal server error'})
    }

    
}
exports.addNewUser=async (req,res)=>
{
     try{
        const {name,age,phone,address}=req.body;
        let user=await User.findOne({name:name});
        if(user)
        {
            console.log(user);
            return res.json({message:'user is already available'});
        }
        else
        {
            user=await User.create({name,age,phone,address});
            user.save();
            res.status(500).json({message:'user added success',user})
        }
     }catch(err){
        console.log(err);
        res.json({message:'internal server error'});
     }
}
// exports.replaceUser=(req,res)=>{
//     const id=+req.params.id;
//     const itemIndex=req.body;
//     user.splice(itemIndex,1,{...req.body,id:id});
//     res.json({message:"replace data success"})

// }
exports.updateUser=async (req,res)=>{
    try
    {
        let id =req.params.id;
        let user=await User.findByIdAndUpdate(id);
        if(!user){
            return res.json({message:'user not found'});
        }
        user=await User.findOneAndUpdate(
            {_id:id},
            {
                $set:{...req.body}
            },
            {
                new:true
            }
        )
        user.save();
        res.json({user,message:'user is updated'});
    }
    catch(err){
        console.log(err);
        res.json({message:'internal server error'});
     }

}


exports.deleteUser=async (req,res)=>
{
    try
    {
        let id =req.params.id;
        let user=await User.findById(id);
        if(!user){
            return res.json({message:'user not found'});
        }
        user=await User.findByIdAndUpdate(
            user._id,{isDelete:true},{new:true}
        )
       
        res.json({user,message:'user is deleted'});
    }
    catch(err)
    {
    console.log(err)
    res.status(500).json({message:'internal server error'})
    }

};