const User = require("../model/user");
const jwt = require("jsonwebtoken");

 const userauth= async(req,res,next)=>{
     //read the token from req cookies
     try{
        const {token} =req.cookies;

        if(!token){
            throw new Error("Token is not valid");
        }
        const decodedobj =await jwt.verify(token ,"skubeedubeedumpa");

        const {_id}=decodedobj;
       const user = await User.findById(_id);

        if(!user){
            throw new Error("User not found");
        }

        req.user =user;
        next();
     }
        catch(err){
            res.status(400).send("Error:"+err.message);
        }
 }

 module.exports={
    userauth,
 }