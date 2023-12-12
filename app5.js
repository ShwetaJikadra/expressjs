const express=require('express');
const app=express();
const morgan=require('morgan');
// const bp=require('body-parser');
const port=1010;
// const path=require('path');
const products=require('./public/product.json');

app.use(morgan('dev'));
app.use(express.json());

app.get('/products',(req,res)=>{
    res.json(products)
});

app.get('/product/:id',(req,res)=>
{
    const id= Number(req.params.id);
    const item=products.find((p)=>p.id === id)
    console.log(item)
    if (item) {
        res.json(item);
    } 
    else {
        res.status(404).json({ message: 'Product not found' });
    }
});
app.post('/products',(req,res)=>{
    products.push(req.body);
    res.json({message:"product is added",products:req.body})
});

app.put('/product/:id',(req,res)=>
{
    const id= Number(req.params.id);
    const itemIndex=products.findIndex((p)=>p.id === id);
    products.splice(itemIndex,1,{...req.body,id:id});
    console.log(itemIndex)
    if (itemIndex) {
        res.json(itemIndex);
    } 
    else {
        res.status(404).json({ message: 'Product is replace' });
    }
});

app.patch('/product/:id',(req,res)=>
{
    const id= Number(req.params.id);
    const itemIndex=products.find((p)=>p.id === id);
    let item=products[itemIndex]
    item=products.splice(itemIndex,1,{...item,...req.body});
    // console.log(itemIndex)
    
        res.status(404).json({ message: 'Product is replace',products:item });

});

app.delete('/product/:id',(req,res)=>
{
    const id= Number(req.params.id);
    const itemIndex=products.findIndex((p)=>p.id === id);
    let item=products[itemIndex]
    item=products.splice(itemIndex,1);
    // console.log(itemIndex)
    
        res.status(404).json({ message: 'Product is delete',products:item });

});




app.listen(port,()=>{
    console.log(`welcome ${port}`);
});