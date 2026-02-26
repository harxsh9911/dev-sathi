const express = require("express");
 const connectdb= require("./config/database");
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
        const user = new User(req.body);
        try{
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
app.patch("/user", async (req, res)=>{
        const userId = req.body.userId;
        const data= req.body;
        try{
            await User.findByIdAndUpdate(userId, data);
            res.send("user update successfully");
        }
        catch(err){
            res.status(400).send("error"+err.message);
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


