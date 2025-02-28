const Application = require("../models/application.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.newApplication = asyncHandler(async(req , res)=>{
    const {userId , protfolioId , jobId} = req.body;
    if(!userId || !protfolioId || !jobId){
        throw new ApiError(400 , "userId or protfolioId or jobId is invalid or missing! ");
    }
    const existApplication = await Application.findOne({$and:[{user:userId} , {job:jobId}]});
    if(existApplication){
        return res.status(400).json(
            new ApiResponse(400 , "application already exists! " , {} , "fail")
        )
    }
    const application = await Application.create({
        user:userId,
        job:jobId,
        protfolio:protfolioId,
    })
    if(!application){
        throw new ApiError(500 , "application is not created! ");
    }
    return res.status(201).json(
        new ApiResponse(201 , "created application is! " , application)
    )
})

exports.getApplicationsOfUser = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is invalid or missing! ");
    }
    const applications = await Application.find({user:userId});
    if(applications.length === 0){
        return res.status(404).json(
            new ApiResponse(404 , "no applications for user! " , {} , "fail")
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "user applications! " , applications)
    )
})

exports.getApplicationsByJob = asyncHandler(async(req , res)=>{
    const {jobId} = req.params;
    if(!jobId || !mongoose.Types.ObjectId.isValid(jobId)){
        throw new ApiError(400 , "jobId is invalid or missing! ");
    }
    const applications = await Application.find({job:jobId});
    if(applications.length === 0){
        return res.status(404).json(
            new ApiResponse(404 , "no applications for job! " , {} , "fail")
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "job applications! " , applications)
    )
})

exports.deleteApplication = asyncHandler(async(req, res)=>{
    const {applicationId} = req.params;
    if(!applicationId || !mongoose.Types.ObjectId.isValid(applicationId)){
        throw new ApiError(400 , "applicationId is invalid or missing! ");
    }
    const application = await Application.findById(applicationId);
    if(!application){
        throw new ApiError(500 , "application is not deleted! ")
    }
    return res.status(204).json()
})