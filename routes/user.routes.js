const express=require('express');
const userRoutes=express.Router();
const {
        getAllUsers,
        getUser,
        addNewUser,
        replaceUser,
        updateUser,
        deleteUser

}=require('../controller/user.controller');
const productRoutes = require('./user.routes');
userRoutes.get('/',getAllUsers);
userRoutes.get('/:id',getUser)
userRoutes.post('/',addNewUser);
userRoutes.put('/:id',replaceUser);
userRoutes.patch('/:id',updateUser);
userRoutes.delete('/:id',deleteUser);
module.exports=userRoutes;
