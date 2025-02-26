const mongoose = require("mongoose");
const saveJobSchema = new mongoose.Schema({
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
} , {timestamps:true});

const SaveJob = mongoose.model("SaveJob" , saveJobSchema);
module.exports = SaveJob;