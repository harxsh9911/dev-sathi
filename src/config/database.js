//g2sSx76P4aVGnSXN
//"mongodb+srv://<db_username>:<db_password>@whiteghost.ua4kswc.mongodb.net/?appName=WhiteGhost"
const mongoose = require("mongoose");

const connectdb = async ()=>{
    await mongoose.connect("mongodb://ramboharsh848_db_user:Ui5NVRqoOF7TNL8r@ac-sfeseh0-shard-00-00.lud6x7m.mongodb.net:27017,ac-sfeseh0-shard-00-01.lud6x7m.mongodb.net:27017,ac-sfeseh0-shard-00-02.lud6x7m.mongodb.net:27017/dev-sathi?ssl=true&replicaSet=atlas-dxpr9j-shard-0&authSource=admin&retryWrites=true&w=majority");
};

module.exports = connectdb;

