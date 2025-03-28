const mongoose = require("mongoose");
const Portfolio = require("../models/portfolio.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const uploadOnCloudinary = require("../utils/cloudinary");
const ApiResponse = require("../utils/apiResponse");

exports.newPortfolio = asyncHandler(async(req , res)=>{
    const {name , email , mobilenumber , careerobjective , skills , courses , projects , userId , 
        sociallinks , extracurricularactivities , additionaldetails , address , education , experience} = req.body;
    console.log(req.body);
    const existPortfolio = await Portfolio.findOne({$and:[{user:userId} , {email}]} );
    if(existPortfolio){
        throw new ApiError(400 , "portfolio already exists! ");
    }
    
    const mediaPath = req.file?.path;
    if(!mediaPath){
        throw new ApiError(500 , "resume path not found! ");
    }
    const uploadedMedia = await uploadOnCloudinary(mediaPath);
    if(!uploadedMedia){
        throw new ApiError(500 , "resume is not uploaded to cloudinary! ");
    }
    const portfolio = await Portfolio.create({
        name,
        email,
        mobilenumber,
        careerobjective,
        skills,
        courses,
        projects,
        user:userId,
        sociallinks,
        extracurricularactivities,
        additionaldetails,
        address,
        education,
        experience,
        resume:uploadedMedia
    });

    if(!portfolio){
        throw new ApiError(500 , "new portfolio is not created! ");
    }
    return res.status(201).json(
        new ApiResponse(201 , "new job is! " , portfolio)
    )
})

exports.getPortfolioByUser = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(400 , "userId is empty or inValid! ");
    }
    const portfolio = await Portfolio.findOne({user:userId});
    if(!portfolio){
        return res.status(404).json(
            new ApiResponse(404 , "no portfolio for user! " , {} , "fail")
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "portfolio of user is! " , portfolio)
    )
})

exports.getProtfolio = asyncHandler(async(req , res)=>{
    const {protfolioId} = req.params;
    if(!protfolioId || !mongoose.Types.ObjectId.isValid(protfolioId)){
        throw new ApiError(400 , "protfolioId is empty or inValid! ");
    }
    const portfolio = await Portfolio.findById(protfolioId);
    if(!portfolio){
        throw new ApiError(400 , "portfolio is not found! ");
    }
    return res.status(200).json(
        new ApiResponse(200 , "protfolio is! " , portfolio)
    )
})

exports.updateProtfolio = asyncHandler(async(req , res)=>{
    const {protfolioId} = req.params;
    if(!protfolioId || !mongoose.Types.ObjectId.isValid(protfolioId)){
        throw new ApiError(400 , "protfolioId is empty or inValid! ");
    }
    if(req.file){
        const mediaPath = req.file?.path;
        if(mediaPath){
            const uploadMedia = uploadOnCloudinary(mediaPath);
            req.body.resume = uploadMedia;
        }
    }
    const portfolio = await Portfolio.findByIdAndUpdate(protfolioId , req.body , {runValidators:true , new:true});
    if(!portfolio){
        throw new ApiError(400 , "portfolio is not found! ");
    }
    return res.status(200).json(
        new ApiResponse(200 , "updated protfolio is! " , portfolio)
    )
})

exports.deleteProtfolio = asyncHandler(async(req , res)=>{
    const {protfolioId} = req.params;
    if(!protfolioId || !mongoose.Types.ObjectId.isValid(protfolioId)){
        throw new ApiError(400 , "protfolioId is empty or inValid! ");
    }
    const portfolio = await Portfolio.findByIdAndDelete(protfolioId);
    if(!portfolio){
        throw new ApiError(400 , "portfolio is not found! ");
    }
    return res.status(204).json()
})