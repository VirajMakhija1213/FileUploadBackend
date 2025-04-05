const express=require("express");
const router=express.Router();
//Importing the controllers
const {localFileUpload, imageUpload, videoUpload, imageSizeReducer}=require("../controllers/fileUpload");
//Linking the controllers
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageSizeReducer",imageSizeReducer);
//Exporting the router
module.exports=router;