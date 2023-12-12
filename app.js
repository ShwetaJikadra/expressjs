const express=require('express');
const app=express();
const port=1010;
const path=require('path');
const auth=((req,res,next)=>{
    console.log(req.query)
    if(req.query.password=='123')
    {
        next();
    }
    else
    {
        res.sendStatus(401);
    }
});

app.get('/',auth,(req,res)=>
{
    res.json({type:"get method"})
});

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'a.html'));
// })

app.post('/',auth,(req,res)=>{
    res.json({type:"post method"})
});
// app.put('/',(req,res)=>{
//      res.json({type:"put method"})
// });

// app.patch('/',(req,res)=>{
//     res.json({type:"patch method"})
// });
// app.delete('/',(req,res)=>
// {
//     res.json({type:"delete method"})
// });

// app.get('/demo',(req,res)=>{
//     console.log(req.ip, req.method, req.statusCode,req.get('User-agent'))
// })





app.listen(port,()=>{
    console.log(`server start ar ${port}`);
})