const product=require('../public/product.json');

exports.getAllProducts=(req,res)=>{
    res.json(product);
};

exports.getProduct=(req,res)=>
{
    const id= Number(req.params.id);
    const item=product.find((p)=>p.id === id)
    console.log(item)
    if (item) {
        res.json(item);
    } 
    else {
        res.status(404).json({ message: 'Product not found' });
    }
};
exports.addNewProduct=(req,res)=>{
    product.push(req.body);
    res.json({message:"product is added",product:req.body})
};

exports.replaceProduct=(req,res)=>
{
    const id= Number(req.params.id);
    const itemIndex=product.findIndex((p)=>p.id === id);
    product.splice(itemIndex,1,{...req.body,id:id});
    console.log(itemIndex)
    if (itemIndex) {
        res.json(itemIndex);
    } 
    else {
        res.status(404).json({ message: 'Product is replace' });
    }
};

exports.updateProduct=(req,res)=>
{
    const id= Number(req.params.id);
    const itemIndex=product.find((p)=>p.id === id);
    let item=product[itemIndex]
    item=product.splice(itemIndex,1,{...item,...req.body});
    // console.log(itemIndex)
    
        res.status(404).json({ message: 'Product is replace',product:item });

};

exports.deleteProduct=(req,res)=>
{
    const id= Number(req.params.id);
    const itemIndex=product.findIndex((p)=>p.id === id);
    let item=product[itemIndex]
    item=product.splice(itemIndex,1);
    // console.log(itemIndex)
    
        res.status(404).json({ message: 'Product is delete',product:item });

};
