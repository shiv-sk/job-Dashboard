const mongoose = require("mongoose");
const orgSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
    },
    about:{
        type:String,
        required:true,
        trim:true,
    },
    size:{
        type:String,
        required:true,
    },
    sociallinks:[{
        title:{
            type:String,
            required:true,
            trim:true
        },
        link:{
            type:String,
            required:true,
            trim:true
        }
    }],
    industry:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
} , {timestamps:true})

const Organization = mongoose.model("Organization" , orgSchema);
module.exports = Organization;