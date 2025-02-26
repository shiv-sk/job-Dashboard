const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:["JobSeeker" , "Employer"],
        default:"JobSeeker"
    }
} , {timestamps:true});

const User = mongoose.model("User" , userSchema);
module.exports = User;