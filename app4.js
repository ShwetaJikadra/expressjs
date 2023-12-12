const express=require('express');
const app=express();
const morgan=require('morgan');
const bp=require('body-parser');
const port=1234;
const path=require('path');
const { request } = require('http');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
const auth=(req,res,next)=>{
  if(req.query.password=='123')
  {
    next();
  }
  else
  {
    res.sendStatus(401);
  }
};
app.use(auth);
app.get('/',(req,res)=>{
  res.json({type:"post"});
  
})

app.listen(port,()=>{
  console.log("welcome")
});
