const express = require("express");
 const connectdb= require("./config/database");
 const {validateSignUpData} = require("./utils/validation");
 const bcrypt =require("bcrypt");
 const validator = require('validator');
const app=express();
// used for schema
const User =require("./model/user");
// this is a middleware which help to convert the json data to js data
app.use(express.json());

app.get("/user", async (req,res)=>{
    const userEmail =req.body.email;
    try{
        const user = await User.find({email:userEmail});
        res.send(user);
    }
catch(err){
        res.status(400).send("something is wrong");
}

})
//this get method is used to get the content
app.get("/feed", async (req,res)=>{
    
    try{
        const user = await User.find({});
        res.send(user);
    }
catch(err){
        res.status(400).send("something is wrong");
}

})
// this is a post request which save the request
app.post("/signup", async (req, res)=>{
        
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
        
})
// this is a delete request 
app.delete("/user", async (req, res)=>{
        const userId = req.body.userId;
        try{
            const user = await User.findByIdAndDelete(userId);
            res.send("user deleted successfully");
        }
        catch(err){
            res.status(400).send("error"+err.message);
        }
        
})
// this is a patch request it is used to update 
app.patch("/user/userId", async (req, res)=>{
        const userId = req.params?.userId;
        const data= req.body;
        try{
            const ALLOWED_UPDATES =["photourl", "about", "firstName","skills"];

            const isUpdatedAllowed = Object.keys(data).every((k)=>
                ALLOWED_UPDATES.includes(k)
            );

            if(!isUpdatedAllowed){
                throw new Error("Update is not allowed");
            }
            if(data?.skills.length>10){
                throw new Error ("more than 10 skills are not allowed");
            }
            await User.findByIdAndUpdate(userId, data,{runValidators:true});
            
            res.send("user update successfully");
            
        }
        catch(err){
            res.status(400).send("error"+err.message);
        }
        
})

app.post("/login", async(req, res)=>{
    try{
        const {email , password} =req.body;

        if(!email || !validator.isEmail(email)){
            throw new Error("Email is not valid");
        }

        if(!password){
            throw new Error("Passwords is required");
        }
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Email is not present");
        }

        const isPasswordValid= await bcrypt.compare(password,user.password);

        if(isPasswordValid){
            res.send("Login successfull");
        }
        else{
            throw new Error("Password is not valid");
        }
    }
    catch(err){
        res.status(404).send("Error:"+err.message);
    }
})

connectdb().then(()=>{
    console.log("database connection established");
    app.listen(7777,()=>{
    console.log("successfully created the server");
    

});
}).catch((err)=>{
    console.log("database cannot be connected");
    
})


