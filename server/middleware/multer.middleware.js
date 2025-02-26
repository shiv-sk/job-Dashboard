const multer  = require('multer');
const path = require("path");
const allowedExtension = [];
const allowedMimeTypes = [];
const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , "./temp/media-uploads");
    },
    filename:function(req , file , cb){
        cb(null , file.fieldname + Date.now());
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