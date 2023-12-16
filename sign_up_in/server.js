const express=require('express');
const morgan = require('morgan');
const app=express();
const port=2020;
const mongoose=require('mongoose');


app.use(morgan('dev'));
app.use(express.json());
// app.use(bcrypt)
const userRoutes=require('./routes/user.routes');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/login');

  
}
main().then(()=>{console.log('db connected')}).catch((err)=>{console.log("error")})


app.use('/api/user',userRoutes);
// app.use('/api/user',userRoutes);


app.listen(port,()=>{
    console.log(`welcome ${port}`);
});

