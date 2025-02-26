const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    requiredskills:[{
        type:String,
        required:true,
        trim:true
    }],
    openings:{
        type:Number,
        required:true,
        min:1,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    salary:{
        type:Number,
        required:true,
        min:1000
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    jobtype:{
        type:String,
        enum:["Full-Time" , "Internship" , "Part-Time"],
        default:"Full-Time"
    },
    locationpreference:{
        type:String,
        enum:["On-Site" , "Work-From-Home"],
        default:"On-Site"
    },
    org:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organization",
        required:true
    }
} , {timestamps:true});

const Job = mongoose.model("Job" , jobSchema);
module.exports = Job;