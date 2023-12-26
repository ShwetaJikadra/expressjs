const mongoose=require('mongoose');
const authSchema=new mongoose.Schema({
    username:{
        type:String,
        
    },
    age:{
        type:Number,
       
    },
    gender:{
         type:String,

         eval:["male","female"]
    },
    email:{
        type:String,
        
    },
    profileImage:{
       type:String
    }
    ,
    isDelete:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model('auth',authSchema);
