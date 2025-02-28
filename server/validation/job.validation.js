const Joi = require("joi");
exports.newJob = Joi.object({
    title:Joi.string().trim().required(),
    openings:Joi.number().min(1).required(),
    salary:Joi.number().min(1000).required(),
    description:Joi.string().trim().required(),
    requiredskills:Joi.array().items(Joi.string().trim().min(1)).required(),
    location:Joi.string().trim().required(),
    jobtype:Joi.string().trim().valid("Full-Time" , "Internship" , "Part-Time").default("Full-Time").required(),
    locationpreference:Joi.string().trim().valid("On-Site" , "Work-From-Home").default("On-Site").required(),
    org:Joi.string().hex().length(24).required()
});
exports.updateJob = Joi.object({
    title:Joi.string().trim(),
    openings:Joi.number().min(1),
    salary:Joi.number().min(1000),
    description:Joi.string().trim(),
    requiredskills:Joi.array().items(Joi.string().trim().min(1)),
    location:Joi.string().trim(),
    jobtype:Joi.string().trim().valid("Full-Time" , "Internship" , "Part-Time").default("Full-Time"),
    locationpreference:Joi.string().trim().valid("On-Site" , "Work-From-Home").default("On-Site"),
    org:Joi.string().hex().length(24)
});