const File=require("../models/File");
const cloudinary=require("cloudinary").v2;
exports.localFileUpload=async(req,res)=>{
    try{
        const file=req.files.file;
        console.log("File is:",file);

        let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;
        console.log("Path is:",path);
        await file.mv(path,(error)=>{
            console.log(error);
            console.error(error);
        });
        res.status(200).json({
            success:true,
            message:"Local file uploaded successfully"
        })
    }
    catch(error)
    {
        console.log("Error while uploading the local file");
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error in uploading the file"
        })
    }
}
function isFileSupported(type,supportedType)
{
    return supportedType.includes(type);
}
async function uploadFileToCloudinary(file,folder,quality)
{
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
exports.imageUpload=async(req,res)=>{
    try{
        //Data fetch karo
        const {name,email,tags}=req.body;
        console.log(name,email,tags);

        const file=req.files.imageFile;
        console.log(file);
        //Validation karo
        const supportedType=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileSupported(fileType,supportedType))
        {
            return res.status(400).json({
                success:false,
                message:"Not supported type of the file"
            })
        }
        //it means file format supported hai
        const response=await uploadFileToCloudinary(file,"codehelp");
        console.log(response);
        //Database mein save karna hai
        const fileData=await File.create({
            name,email,tags,imageUrl:response.secure_url
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully uploaded"
        })
    }
    catch(error)
    {
        console.log(error);
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error while uploading the image"
        })
    }
}
exports.videoUpload=async(req,res)=>{
    try{
        const{name,email,tags}=req.body;
        console.log({name,email,tags});
        const file=req.files.videoFile;
        //Validation karo
        const supportedType=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileSupported(fileType,supportedType))
        {
            return res.status(400).json({
                success:false,
                message:"Not supported type of the file"
            })
        }
        //it means file format supported hai
        const response=await uploadFileToCloudinary(file,"codehelp");
        console.log(response);
        //Database mein save karna hai
        const fileData=await File.create({
            name,email,tags,imageUrl:response.secure_url
        })
        res.json({
            success:true,
            data:fileData,
            message:"Video Successfully uploaded"
        })
    }
    catch(error)
    {
        console.log(error);
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error while uploading the Video"
        })
    }
}
exports.imageSizeReducer=async(req,res)=>{
    try{
        //Data fetch karo
        const {name,email,tags}=req.body;
        console.log(name,email,tags);

        const file=req.files.imageFile;
        console.log(file);
        //Validation karo
        const supportedType=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileSupported(fileType,supportedType))
        {
            return res.status(400).json({
                success:false,
                message:"Not supported type of the file"
            })
        }
        //it means file format supported hai
        const response=await uploadFileToCloudinary(file,"codehelp",10);
        console.log(response);
        //Database mein save karna hai
        const fileData=await File.create({
            name,email,tags,imageUrl:response.secure_url
        })
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully uploaded"
        })
    }
    catch(error)
    {
        console.log(error);
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error while uploading the image"
        })
    }
}