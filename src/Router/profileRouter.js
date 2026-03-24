const express = require ('express');

const profileRouter = express.Router();

const {userauth} =require("../middleware/auth");
const {validateEditProfileData} =require("../utils/validation")

profileRouter.get("/profile", userauth, async(req, res)=>{
   try{
    
    // validate my token 
        const user = req.user;
         res.send(user);
   }
   catch(err){
        res.status(400).send("Error:"+err.message);
    }
})

profileRouter.patch("/profile/edit", userauth, async(req, res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("invalid edit request");
        }
        const loggedInUser =req.user;
        Object.keys(req.body).forEach(key=>(loggedInUser[key]=req.body[keys]));
        await loggedInUser.save();
        res.json({message:`${loggedInUser.firstName}, your profile is successfully edited`, data:loggedInUser});
    }
    catch(err){
        res.status(400).send("Error:"+err.message);
    }
})
module.exports =profileRouter;