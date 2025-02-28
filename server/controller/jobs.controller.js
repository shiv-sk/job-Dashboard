const mongoose = require("mongoose");
const Job = require("../models/jobs.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.newJob = asyncHandler(async (req , res)=>{
    const {title , requiredskills , openings , description , salary , location , jobtype , locationpreference , org} = req.body;
    const job = await Job.create({
        title,
        requiredskills,
        openings,
        description,
        salary,
        location,
        jobtype,
        locationpreference,
        org
    });
    if(!job){
        throw new ApiError(500 , "new job is not created! ");
    }
    return res.status(201).json(
        new ApiResponse(201 , "new job is! " , job)
    )
});

exports.getJobsByOrg = (async(req , res)=>{
    const {orgId} = req.params;
    if(!orgId || !mongoose.Types.ObjectId.isValid(orgId)){
        throw new ApiError(400 , "orgId is empty or inValid! ");
    }
    const jobs = await Job.find({orgId});
    if(jobs.length === 0){
        return res.status(404).json(
            new ApiResponse(404 , "no jobs for the Org! " , {} , "fail")
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "jobs are! " , jobs)
    )
})

exports.allJobs = asyncHandler(async(req , res)=>{
    const jobs = await Job.find();
    if(jobs.length === 0){
        return res.status(404).json(
            new ApiResponse(404 , "no jobs found! " , {} , "fail")
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "jobs are! " , jobs)
    )
})

exports.getJob = asyncHandler(async(req , res)=>{
    const {jobId} = req.params;
    if(!jobId || !mongoose.Types.ObjectId.isValid(jobId)){
        throw new ApiError(400 , "jobId is missing or inValid! ");
    }
    const job = await Job.findById(jobId);
    if(!job){
        return res.status(404).json(
            new ApiResponse(404 , "no job found! " , {} , "fail")
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "job are! " , job)
    )
})

exports.updateJob = asyncHandler(async(req , res)=>{
    const {jobId} = req.params;
    if(!jobId || !mongoose.Types.ObjectId.isValid(jobId)){
        throw new ApiError(400 , "jobId is missing or inValid! ");
    }
    const updatedJob = await Job.findByIdAndUpdate(jobId , req.body , {runValidators:true , new:true});
    if(!updatedJob){
        throw new ApiError(500 , "job is not updated! ");
    }
    return res.status(200).json(
        new ApiResponse(200 , "updated job is! " , updatedJob)
    )
})

exports.deleteJob = asyncHandler(async(req , res)=>{
    const {jobId} = req.params;
    if(!jobId || !mongoose.Types.ObjectId.isValid(jobId)){
        throw new ApiError(400 , "jobId is missing or inValid! ");
    }
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if(!deletedJob){
        throw new ApiError(500 , "job is not deleted! ");
    }
    return res.status(204).json()
})
