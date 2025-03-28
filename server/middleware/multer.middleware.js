const multer  = require('multer');
const path = require("path");
const allowedExtension = [".jpeg" , ".jpg" , ".png" , ".gif" , ".webp" , ".pdf"];
const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp" , "application/pdf"];
const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , "./temp/media-uploads");
    },
    filename:function(req , file , cb){
        const extension = path.extname(file.originalname);
        cb(null , file.fieldname + Date.now() + extension);
    }
})

const fileFilter = function(req , file , cb){
    const extension = allowedExtension.includes(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype = allowedMimeTypes.includes(file.mimetype);
    if(!extension || !mimetype){
        return cb(new Error("Invalid file type. Only PDF, JPG, PNG and DOCX files are allowed!. ") , false);
    }
    return cb(null , true);
}
const upload = multer({
    storage,
    limits:{ fileSize: 5 * 1024 * 1024 },
    fileFilter
})
module.exports = upload;