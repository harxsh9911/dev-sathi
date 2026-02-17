const express = require("express");

const app=express();

// app.get("/user" ,(req,res)=>{
//     res.send({firstname:"Horse", lastname:"pichai"});
// });

const {Adminauth}=require("./middleware/auth");
 app.use("/admin",Adminauth);
app.get("/admin/adduser" ,(req,res)=>{
    res.send("added the user data");
});

app.get("/admin/deleteuser" ,(req,res)=>{
    res.send("deleted the user data");
});


// app.use("/user",(req,res,next)=>{
//     console.log("handling the route 1");
//     next();    

// });

// app.use("/user",(req,res,next)=>{
//     console.log("halding the route 1");
//     next();

// });
// app.get("/google",(req,res)=>{
//     res.redirect("https://www.google.com");
// })

// app.post("/user", (req,res)=>{
//     res.send("data successfully saved in data base");
// });
// app.delete("/user",(req,res)=>{
//     res.send("data deleted successfully");
// });
// app.use("/user",(req,res) => {
//     res.send("love me like you do");
// });
app.use((req,res) => {
    res.send("hello from server");
});

app.listen(7777,()=>{
    console.log("successfully created the server");

});