const Application = require("../models/application.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");
const confirmationMail = require("../utils/sendMail")

exports.newApplication = asyncHandler(async(req , res)=>{
    const {userId , portfolioId , jobId} = req.body;
    const existApplication = await Application.findOne({$and:[{user:userId} , {job:jobId}]});
    if(existApplication){
        return res.status(400).json(
            new ApiResponse(400 , "application already exists! " , {} , "fail")
        )
    }
    const application = await Application.create({
        user:userId,
        job:jobId,
        portfolio:portfolioId,
    })
    if(!application){
        throw new ApiError(500 , "application is not created! ");
    }
    const populateApplication = await Application.findById(application._id).populate([{path:"user" , select:"email name"} , 
        {path:"job" , select:"title" , populate:{path:"org" , select:"name email"}}]);
    // console.log(userEmail , userName , organizationMail , organizationName , JobTitle);
    let userEmail;
    let userName;
    let organizationMail;
    let organizationName;
    let JobTitle;
    if(populateApplication){
        userEmail = populateApplication.user.email;
        userName = populateApplication.user.name;
        organizationMail = populateApplication.job.org.email;
        organizationName = populateApplication.job.org.name;
        JobTitle = populateApplication.job.title;
        console.log(userEmail , userName , organizationMail , organizationName , JobTitle);
    }
    const sentMail = await confirmationMail.sendConfirmationMail(userEmail , organizationMail , JobTitle , userName , organizationName);
    return res.status(201).json(
        new ApiResponse(201 , "created application is! " , application)
    )
})

exports.getApplicationsOfUser = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is invalid or missing! ");
    }
    const applications = await Application.find({user:userId}).populate("job" , "title");
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
    const applications = await Application.find({job:jobId})
    .populate([{path:"user" , select:"name email"}]);
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

//aggregation-pipeline
//total applications received on week wise
exports.totalApplicationsRecevied = asyncHandler(async (req , res)=>{
    const {jobId} = req.params;
    if(!jobId){
        throw new ApiError(400 , "jobId is required! ");
    }
    const totalApplications = await Application.aggregate(
        [
            {
              $match: {
                job: new mongoose.Types.ObjectId(String(jobId)),
              },
            },
            {
              $group: {
                _id: {
                    year: { $isoWeekYear: "$createdAt" },
                    week: { $isoWeek: "$createdAt" },
                },
                totalApplicationsReceived: {
                  $sum: 1,
                },
              },
            },
            {
                $sort:{
                    "_id.year": 1,
                    "_id.week": 1,
                }
            }
        ]
    )
    if(totalApplications.length === 0){
        return res.status(200).json(
            new ApiResponse(200, "applications are not found! " , {})
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "total Applications are! " , totalApplications)
    )
})

//total application submitted by user
exports.applicationsSubmitted = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId){
        throw new ApiError(400 , "userId is required! ");
    }

    const applicationSubmitted = await Application.aggregate(
        [
            {
              $match: {
                user: new mongoose.Types.ObjectId(String(userId))
              },
            },
            {
              $group: {
                _id: "$status",
                totalApplications: {
                  $sum: 1,
                },
              },
            },
        ]
    )
    if(!applicationSubmitted.length){
        return res.status(200).json(
            new ApiResponse(200 , "there are no applications for user! " , {})
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "the submitted applications are! " , applicationSubmitted)
    )
})

//Skill gap between job and User
exports.skillGapGraph = asyncHandler(async(req , res)=>{
    const {applicationId} = req.params
    if(!applicationId){
        throw new ApiError(400 , "applications is required! ");
    }
    const skillGap = await Application.aggregate(
        [
            {
              $match: {
                _id:new mongoose.Types.ObjectId(String(applicationId))
              }
            },
            {
              $lookup: {
                from: "portfolios",
                localField: "portfolio",
                foreignField: "_id",
                as: "portfolioDetails"
              }
            },
            {
              $unwind: "$portfolioDetails"  
            },
            {
              $lookup: {
                from: "jobs",
                localField: "job",
                foreignField: "_id",
                as: "jobDetails"
              }
            },
            {
              $unwind: "$jobDetails"
            },
            {
              $project: {
                userId:"$user",
                jobId:"$job",
                userSkills:"$portfolioDetails.skills",
                requiredSkills:"$jobDetails.requiredSkills",
                skillGap:{
                  $setDifference:["$jobDetails.requiredSkills" , "$portfolioDetails.skills"]
                }
              }
            }
        ]
    )
    if(skillGap.length === 0){
        return res.status(200).json(
            new ApiResponse(200 , "there are no data to compare Skills! ", {})
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "skill gap between user and job! " , skillGap)
    )
})