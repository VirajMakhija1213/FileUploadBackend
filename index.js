const express=require("express");
const app=express();
require("dotenv").config();
const PORT=process.env.PORT || 3000
//Middleware
app.use(express.json());
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));
//Routes ko import karo and middleware daldo
const route=require("./routes/fileUpload");
app.use("/api/v1/upload",route);
//Server start kar rhe hai
app.listen(PORT,()=>{
    console.log(`Server Started at Port number ${PORT}`);
})
//Db se connection
const dbConnect=require("./config/database");
dbConnect();
//Cloudinary se connection
const cloudinaryConnect=require("./config/cloudinary");
cloudinaryConnect();
//Default route
app.get("/",(req,res)=>{
    res.send("<h1>Hey Welcome to the coding club of Viraj!</h1>")
})