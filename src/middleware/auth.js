 const Adminauth=(req,res,next)=>{
     console.log("hdfuihfhik");
        const token ="xyz";
        const adminauthorized = token ==="xyz";
        if(!adminauthorized){
            res.status(401).send("Unauthorized request");
        }
        else{
            next();
        }
 }

 module.exports={
    Adminauth,
 }