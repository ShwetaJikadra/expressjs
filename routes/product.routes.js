const express=require('express');
const productRoutes=express.Router();
const {addNewProduct,
        getAllProducts,
        getProduct,
        replaceProduct,
        updateProduct,
        deleteProduct
    }=require('../controller/product.controller');
    productRoutes.get('/',getAllProducts);
    
    productRoutes.get('/:id',getProduct);
    productRoutes.post('/',addNewProduct)
    
    productRoutes.put('/:id',replaceProduct);
    
    productRoutes.patch('/:id',updateProduct);
    
    productRoutes.delete('/:id',deleteProduct);
    

    module.exports=productRoutes;