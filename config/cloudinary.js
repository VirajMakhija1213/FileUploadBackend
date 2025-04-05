const cloudinary=require("cloudinary");
require("dotenv").config();
const cloudinaryConnect=()=>{
    try{
        console.log("Cloudinary Connection Established Successfully")
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
    }
    catch(error)
    {
        console.log("Error while connection with Cloudinary");
        console.error(error);
        process.exit(1);
    }
};
module.exports=cloudinaryConnect;