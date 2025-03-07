const Organization = require("../models/org.model");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const uploadOnCloudinary = require("../utils/cloudinary");
exports.newOrg = asyncHandler(async (req , res)=>{
    const {name , about , size , socialLinks , industry , user} = req.body;
    const existOrg = await Organization.findOne({user});
    if(existOrg){
        throw new ApiError(400 , "organization already exist! ");
    }
    const mediaPath = req.file?.path;
    if(!mediaPath){
        throw new ApiError(500 , "Logo path not found! ");
    }
    const uploadMedia = await uploadOnCloudinary(mediaPath);
    if(!uploadMedia){
        throw new ApiError(500 , "Logo is uploaded to cloudinary! ");
    }

    const org = await Organization.create({
        name,
        size,
        about,
        socialLinks,
        industry,
        logo:uploadMedia,
        user,
    })

    if(!org){
        throw new ApiError(500 , "new org is not created! ");
    }

    return res.status(201).json(
        new ApiResponse(201 , "new org is created" , org)
    )
});

exports.getOrgByUser = asyncHandler(async(req , res)=>{
    const {userId} = req.params;
    if(!userId){
        throw new ApiError(400 , "userId is required! ");
    }
    const org = await Organization.findOne({user:userId});
    if(!org){
        return res.status(404).json(
            new ApiResponse(404 , "no organization for user! " , {} , "fail")
        )
    }
    return res.status(200).json(
        new ApiResponse(200 , "org of user is! " , org)
    )
})

exports.updateOrg = asyncHandler(async(req , res)=>{
    const {orgId} = req.params;
    if(!orgId){
        throw new ApiError(400 , "orgId is required! ");
    }
    if(req.file){
        const mediaPath = req.file?.path;
        if(mediaPath){
            const uploadMedia = await uploadOnCloudinary(mediaPath);
            req.body.logo = uploadMedia;
        }
    }
    const updatedOrg = await Organization.findByIdAndUpdate(orgId , req.body , {runValidators:true , new:true});
    if(!updatedOrg){
        throw new ApiError(500 , "changes are not effected to Org! ");
    }
    return res.status(200).json(
        new ApiResponse(200 , "updated org is! " , updatedOrg)
    )
})

exports.deleteOrg = asyncHandler(async(req , res)=>{
    const {orgId} = req.params;
    const deletedOrg = await Organization.findByIdAndDelete(orgId);
    if(!deletedOrg){
        throw new ApiError(500 , "org is not deleted! ");
    }
    return res.status(200).json(
        new ApiResponse(200 , "Org is deleted! " , {})
    )
});