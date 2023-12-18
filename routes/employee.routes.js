const express=require('express');
const employeeRouter=express.Router();
const {addNewEmployee,getEmployee,getAllEmployees,replaceEmployee,updateEmployee,deleteEmployee}=require('../controller/employee.controller');
employeeRouter.post('/',addNewEmployee);
employeeRouter.get('/',getAllEmployees);
employeeRouter.get('/:id',getEmployee);
employeeRouter.put('/:id',replaceEmployee);
employeeRouter.patch('/:id',updateEmployee);
