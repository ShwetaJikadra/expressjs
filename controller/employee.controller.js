const Employee=require('../model/employee.model');
exports.addNewEmployee=async (req,res)=>{
let {name,age,deg,address,gender}=req.body;
let employee=req.find({name:name})
if(employee){
    
}
}