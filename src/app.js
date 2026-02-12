const express = require("express");

const app=express();

app.use("/secret", (req,res) => {
    res.send("hello from secret server");
});

app.use("/guki", (req,res) => {
    res.send("hello from guki");
});

app.use("/maggie", (req,res) => {
    res.send("hello from maggie");
});

app.use((req,res) => {
    res.send("hello from server");
});

app.listen(7777,()=>{
    console.log("successfully created the server");

});