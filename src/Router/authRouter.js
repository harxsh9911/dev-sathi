const express = require ('express');
const {userauth} =require("../middleware/auth");
 const bcrypt =require("bcrypt");
  const {validateSignUpData} = require("../utils/validation");
  const User = require("../model/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res)=>{
        
        try{
            //validating of data
            validateSignUpData(req);

            const {firstName,lastName,email} =req.body;
            // Encrypting password 
            const { password } = req.body;
            const passwordhash = await bcrypt.hash(password,10);
            console.log(passwordhash);

            const user = new User({
                firstName,
                lastName,
                email,
                password:passwordhash,
            });
            await user.save();
            res.send("user is added");
        }
        catch(err){
            res.status(400).send("error"+err.message);
        }
        
});

authRouter.post("/login", async(req, res)=>{
    try{
        const {email , password} =req.body;
        
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Email is not present");
        }

        const isPasswordValid= await user.validatePassword(password);

        if(isPasswordValid){
            // create the JWT Cookie

            const token =await user.getJWT();
            // Add the token to cookie and send the response back to user
            res.cookie("token", token);

            res.send("Login successfull");
        }
        else{
            throw new Error("Password is not valid");
        }
    }
    catch(err){
        res.status(404).send("Error:"+err.message);
    }
});
authRouter.post("/logout", async(req,res)=>{
    res.cookie("token", null,{expires : new Date(Date.now())});
    res.send("logout successful");
})

module.exports=authRouter;