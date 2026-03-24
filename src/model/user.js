const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose=require('mongoose');
const validator= require('validator');
const bcrypt = require("bcrypt");
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

userSchema.methods.getJWT = async function(){
    const user =this;
    const token = await jwt.sign({_id : user._id}, "skubeedubeedumpa", {expiresIn :"7d"});
    return token;
}
userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash =user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const User= mongoose.model("User",userSchema);

module.exports=User;