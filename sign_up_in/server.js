require('dotenv').config();

const express=require('express');
const morgan = require('morgan');
const app=express();
const port=process.env.PORT;
const mongoose=require('mongoose');


app.use(morgan('dev'));
app.use(express.json());
// app.use(bcrypt)
const userRoutes=require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes=require('./routes/cart.routes')
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);

  
}
main().then(()=>{console.log('db connected')}).catch((err)=>{console.log("error")})


app.use('/api/user',userRoutes);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRouters)


app.listen(port,()=>{
    console.log(`welcome ${port}`);
});

