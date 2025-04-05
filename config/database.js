const mongoose=require("mongoose");
require("dotenv").config();
const dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Databae Connection Established Successfully");
    })
    .catch((error)=>{
        console.log("Error while connecting with the database");
        console.error(error);
        process.exit(1);
    })
}
module.exports=dbConnect;