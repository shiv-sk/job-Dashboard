const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },
    protfolio:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Protfolio",
        required:true
    },
    status:{
        type:String,
        enum:["Applied" , "OnReview" , "Scheduled" , "Rejected" , "Hired"],
        default:"Applied"
    }
} , {timestamps:true})

const Application = mongoose.model("Application" , applicationSchema);
module.exports = Application;