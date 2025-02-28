const cloudinary = require('cloudinary').v2;
const fs = require("fs");
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(path)=>{
    try {
        const uploadedMedia = await cloudinary.uploader.upload(path, {resource_type:"auto"});
        fs.unlinkSync(path);
        return uploadedMedia.secure_url;
    } catch (error) {
        fs.unlinkSync(path);
        console.log("error from cloudinary! " , error);
    }
}
module.exports = uploadOnCloudinary;