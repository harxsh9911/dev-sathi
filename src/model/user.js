const mongoose=require('mongoose');
const validator= require('validator');
const userSchema = mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        unique: true,
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        required : true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid email address:"+value);
            }
        }
    },
    password:{
        type: String,
        unique:true,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error ("your password is not strong:"+value);
            }
        }
    },
    age:{
        type: Number
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error("gender is not entered properly" );
            }
        }
    },
    photourl :{
        type : String,
       
    }
    
},
{
        timestamps : true
}
);

const User= mongoose.model("User",userSchema);

module.exports=User;