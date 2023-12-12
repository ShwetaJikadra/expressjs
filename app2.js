const express=require('express');
const app=express();
const port=1010;
const path=require('path');
const morgan=require('morgan');

// app.get('/', (req, res) => {
//     res.download('./a.html')
//   })

// app.get('/users/:userId/books/:bookId',(req,res)=>{
//     res.send(req.params)
// })
// app.get('/', (req, res) =>{
// res.redirect('http://google.com')
// });

app.get('/a', (req, res) =>{
res.redirect('back');
});


app.get('/ab*cd', (req, res) => {
    res.send('ab*cd')
  })
// app.use(morgan('dev'));
// app.use(express.json());

// const auth=(req,res,next)=>{
//     if(req.body.password=='123')
//     {
//         next();
//     }
//     else
//     {
//         res.sendStatus(401);
//     }
// }

// app.get('/',(req,res)=>
// {
//     res.json({type:"get method"})
// });

// app.post('/',auth,(req,res)=>{
//     res.json({type:"post method"})
// });

app.listen(port,()=>{
    console.log(`server start ar ${port}`);
})