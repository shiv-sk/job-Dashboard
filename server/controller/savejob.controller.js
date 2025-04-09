const mongoose  = require("mongoose");
const SaveJob = require("../models/savejob.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.newSaveJob = asyncHandler(async(req , res)=>{
    const {userId , jobId} = req.body;
    const existSavedJob = await SaveJob.findOne({$and:[{user:userId} , {job:jobId}]});
    if(existSavedJob){
        throw new ApiError(400 , "job is already saved! ");
    }
    const savedJob = await SaveJob.create({
        user:userId,
        job:jobId
    });
    if(!savedJob){
        throw new ApiError(500 , "job is not saved! ");
    }
    return res.status(201).json(
        new ApiResponse(201 , "savedJob is! " , savedJob)
    )
})

exports.getSavedJobByUser = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is invalid or missing! ");
    }
    const savedJobs = await SaveJob.find({user:userId}).populate("job" , "location salary jobtype locationpreference title");
    if(savedJobs.length === 0){
        return res.status(404).json(
            new ApiResponse(404 , "no saved jobs for user! " , {} , "fail")
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "savedJobs are! " , savedJobs)
    )
})

exports.updateSaveJob = asyncHandler(async(req , res)=>{
    const {saveJobId} = req.params;
    if(!saveJobId || !mongoose.Types.ObjectId.isValid(saveJobId)){
        throw new ApiError(400 , "saveJobId is invalid or missing! ");
    }
    const updatedSaveJob = await SaveJob.findByIdAndUpdate(saveJobId , req.body , {runValidators:true , new:true});
    if(!updatedSaveJob){
        throw new ApiError(500 , "SaveJob is not updated! ");
    }
    return res.status(200).json(
        new ApiResponse(200 , "savedJob is! " , updatedSaveJob)
    )
})

exports.deleteSaveJob = asyncHandler(async(req , res)=>{
    const {saveJobId} = req.params;
    if(!saveJobId || !mongoose.Types.ObjectId.isValid(saveJobId)){
        throw new ApiError(400 , "saveJobId is invalid or missing! ");
    }
    const deletedSaveJob = await SaveJob.findByIdAndUpdate(saveJobId , req.body , {runValidators:true , new:true});
    if(!deletedSaveJob){
        throw new ApiError(500 , "SaveJob is not deleted! ");
    }
    return res.status(204).json()
})
