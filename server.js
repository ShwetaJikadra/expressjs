require('dotenv').config();
const express=require('express');
const app=express();
const morgan=require('morgan');

// const bp=require('body-parser');
const port=process.env.PORT;
// const path=require('path');


app.use(morgan('dev'));
app.use(express.json());

const productRoutes=require('./routes/product.routes');
const userRoutes=require('./routes/user.routes')

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);

  
}
main().then(()=>{console.log('db connected')}).catch((err)=>{console.log("error")})


app.use('/product',productRoutes);
app.use('/user',userRoutes);
// app.use('/employee',employeeRoutes)

app.listen(port,()=>{
    console.log(`welcome ${port}`);
});