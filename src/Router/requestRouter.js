const express = require("express");
const requestRouter =express.Router();

const {userauth} =require("../middleware/auth");

requestRouter.post("/sendConnectionRequest", userauth, async(req,res)=>{
    try{
        const user = req.user;
        res.send(user.firstName+"connection request ");
    }
    catch(err){
        res.status(400).send("error:"+err.message);
    }
});

module.exports=requestRouter;