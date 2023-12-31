const express=require('express');
const authRoutes=express.Router()
const {upload}=require('../helpers/imageUpload');
const Auth=require('../model/auth.model');

authRoutes.post('/image',upload.array('profileImage'),async (req,res)=>{
    let image=[];
    console.log(req.files)
    if(req.files)
    {
        for(let i=0;i<req.files.length;i++)
        {
            image[i]=`${req.files[i].path}`;
        }
        console.log(image)
    }
    // if(req.files){
    //     req.body.profileImage=`${req.file.path}`;
    // }
    let newAuth=await Auth.create({
        ...req.body,
        profileImage:image
    })
    newAuth.save();
    res.json({Auth:newAuth});
});

module.exports=authRoutes;
