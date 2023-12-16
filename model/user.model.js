const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    age:{
        type:Number
    },
    phone:{
        type:Number
    },
    address:{
type:[String]
    },
    isDelete:{
        type:Boolean,
        default:false
    }
});
const users=mongoose.model('users',userSchema)
module.exports=users;