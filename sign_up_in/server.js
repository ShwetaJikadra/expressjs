require('dotenv').config();
const multer=require('multer');
const express=require('express');
const morgan = require('morgan');

const app=express();
const path=require('path');
const imagepath=path.join(__dirname,'public','images')
const port=process.env.PORT;
const mongoose=require('mongoose');


app.use(morgan('dev'));
app.use(express.json());
app.use('/public/images',express.static(imagepath))
// app.use(bcrypt)
const userRoutes=require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes=require('./routes/cart.routes');
const orderRoutes=require('./routes/order.routes')
const authRoutes=require('./routes/auth.routes')
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);

  
}
main().then(()=>{console.log('db connected')}).catch((err)=>{console.log("error")})


app.use('/api/user',userRoutes);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes);
app.use('/api/auth',authRoutes);


app.listen(port,()=>{
    console.log(`welcome ${port}`);
});

