// const product=require('../public/product.json');
const Product=require('../model/product.model');

exports.addNewProduct=async (req,res)=>{
    // res.json(product);
    const {title,description,price,category,brand}=req.body;
    let product=await Product.findOne({title:title});
    if(product)
    {
        return res.json({message:'product is already Exist'})
    }
    else{
        product=await Product.create({
            title,description,price,category,brand
        });
        product.save();
        res.json({message:'product is added',product})
    }
};

exports.getProduct=async(req,res)=>
{
    try{
    const id= req.params.id;
    const product=await Product.findById(id);
    res.json(product);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllProducts=async (req,res)=>{
    try{
        let product=await Product.find({isDelete:false});
        res.json(product)
    }
    catch(err)
    {
    console.log(err)
    res.status(500).json({message:'internal server error'})
    }
};

// exports.replaceProduct=(req,res)=>
// {
//     const id= Number(req.params.id);
//     const itemIndex=Product.findIndex((p)=>p.id === id);
//     Product.splice(itemIndex,1,{...req.body,id:id});
//     console.log(itemIndex)
//     if (itemIndex) {
//         res.json(itemIndex);
//     } 
//     else {
//         res.status(404).json({ message: 'Product is replace' });
//     }
// };

exports.updateProduct=async (req,res)=>
{
    try
    {
        let id =req.params.id;
        let product=await Product.findByIdAndUpdate(id);
        if(!product){
            return res.json({message:'product not found'});
        }
        product=await Product.findOneAndUpdate(
            {_id:id},
            {
                $set:{...req.body}
            },
            {
                new:true
            }
        )
        product.save();
        res.json({product,message:'product is updated'});
    }
    catch(err)
    {
    console.log(err)
    res.status(500).json({message:'internal server error'})
    }

};

exports.deleteProduct=async (req,res)=>
{
    try
    {
        let id =req.params.id;
        let product=await Product.findById(id);
        if(!product){
            return res.json({message:'product not found'});
        }
        product=await Product.findByIdAndUpdate(
           product._id,{isDelete:true},{new:true}
        )
       
        res.json({message:'product is deleted'});
    }
    catch(err)
    {
    console.log(err)
    res.status(500).json({message:'internal server error'})
    }

};
