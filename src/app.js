const express = require("express");
 const connectdb= require("./config/database");


 const validator = require('validator');
const cookieparser =require("cookie-parser");



const app=express();
// used for schema

// this is a middleware which help to convert the json data to js data
app.use(express.json());
app.use(cookieparser());

const authRouter = require("./Router/authRouter");
const profileRouter = require("./Router/profileRouter");
const requestRouter =require("./Router/requestRouter");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/", requestRouter);







connectdb().then(()=>{
    console.log("database connection established");
    app.listen(7777,()=>{
    console.log("successfully created the server");
    

});
}).catch((err)=>{
    console.log("database cannot be connected");
    
})


