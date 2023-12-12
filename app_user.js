const express=require('express');
const morgan = require('morgan');
const app=express();
const path=require('path');
app.use(express.json());
app.use(morgan('dev'))
const user=require('./public/users.json');
const port=3000;


app.get('/users',(req,res)=>{
    res.json(user);
});

app.get('/user/:id',(req,res)=>{
    const id=Number(req.params.id);
    const itm=user.find((p)=>p.id===id)
    console.log(itm);
    res.json(itm);
    res.status(400);
});

    app.post('/user',(req,res)=>{
           const item=req.body;
           user.push(item);
           console.log(item);
           res.status(400).json({message:"record add successfully"});


});

app.post('/products',(req,res)=>{
    products.push(req.body);
    res.json({message:"product is added",products:req.body})
});

app.put('/user/:id',(req,res)=>
{
    const id= Number(req.params.id);
    const itemIndex=user.findIndex((p)=>p.id === id);
    user.splice(itemIndex,1,{...req.body,id:id});
    console.log(itemIndex)
    if (itemIndex) {
        res.json(itemIndex);
    } 
    else {
        res.status(400).json({ message: 'Product is replace' });
    }
});

app.patch('/user/:id',(req,res)=>{
    const id=+req.params.id;
    const itemIndex=user.findIndex((p)=>p.id===id);
    user.splice(itemIndex,1,{...req.body,id:id});
    console.log(itemIndex);
   
        res.status(400).json({message:'product is update',id:itemIndex+1});;
    
});

app.listen(port,()=>{
    console.log(`server started ${port}`);
})
