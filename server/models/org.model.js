const mongoose = require("mongoose");
const orgSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
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
    socialLinks:{
        type:[
            {
                title:{
                    type:String,
                    required:true,
                    trim:true
                },
                link:{
                    type:String,
                    required:true,
                    trim:true
                },
            }
        ],
        required:true,
    },
    industry:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    logo:{
        type:String,
        required:true,
        trim:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
} , {timestamps:true})

const Organization = mongoose.model("Organization" , orgSchema);
module.exports = Organization;