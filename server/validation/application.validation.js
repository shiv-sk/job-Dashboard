const Joi = require("joi");
exports.applicationSchema = Joi.object({
    userId:Joi.string().hex().length(24).required(),
    jobId:Joi.string().hex().length(24).required(),
    portfolioId:Joi.string().hex().length(24).required(),
    status:Joi.string().valid("Applied" , "OnReview" , "Scheduled" , "Rejected" , "Hired").default("Applied")
})