const express = require("express");

const app=express();

// app.get("/user" ,(req,res)=>{
//     res.send({firstname:"Horse", lastname:"pichai"});
// });
app.use("/user",(req,res,next)=>{
    console.log("halding the route 1");
    next();
    
},
    (req, res,next)=>{
        console.log("handling the route 2");
        next();
    },
    (req,res,next)=>{
    console.log("halding the route 3");
    next();
    
},
(req,res,next)=>{
    console.log("halding the route 4");
    res.send("response2!");
}
);

app.post("/user", (req,res)=>{
    res.send("data successfully saved in data base");
});
app.delete("/user",(req,res)=>{
    res.send("data deleted successfully");
});
app.use((req,res) => {
    res.send("hello from server");
});

app.listen(7777,()=>{
    console.log("successfully created the server");

});