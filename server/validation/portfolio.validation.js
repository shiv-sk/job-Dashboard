const Joi = require("joi");
exports.newProtfolioSchema = Joi.object({
    name:Joi.string().min(3).trim().required(),
    email:Joi.string().email().trim().required(),
    mobilenumber:Joi.string().trim().required(),
    careerobjective:Joi.string().min(10).max(300).trim().required(),
    skills:Joi.array().items(Joi.string().min(1).trim().lowercase()).min(1).required(),
    courses:Joi.array().items(Joi.string().min(1).trim().lowercase()).min(1).optional(),
    extracurricularactivities:Joi.array().items(Joi.string().min(1).trim()).min(1),
    projects:Joi.array().items(
        Joi.object({
            title:Joi.string().min(3).max(150).trim().required(),
            link:Joi.string().min(3).uri().trim().required(),
        }).required()
    ).required(),
    sociallinks:Joi.array().items(
        Joi.object({
            socialmedia:Joi.string().min(3).max(150).lowercase().trim().required(),
            link:Joi.string().min(3).uri().trim().required(),
        }).required()
    ).required(),
    education:Joi.array().items(
        Joi.object({
            degree:Joi.string().min(3).max(150).trim().required(),
            institution:Joi.string().min(3).max(150).trim().required(),
            year:Joi.string().min(3).max(150).trim().required(),
        }).required()
    ),
    experience:Joi.array().items(
        Joi.object({
            company:Joi.string().min(3).max(150).trim().optional(),
            role:Joi.string().min(3).max(100).trim().optional(),
            years:Joi.string().min(1).max(3).trim().optional(),
        }).optional()
    ),
    address:Joi.object({
        city:Joi.string().trim().max(200).required(),
        state:Joi.string().trim().max(200).required(),
        country:Joi.string().trim().max(200).required(),
    }).required(),
    userId:Joi.string().trim().hex().length(24).required(),
})
exports.updateProtfolioSchema = Joi.object({
    name:Joi.string().min(3).trim(),
    email:Joi.string().email().trim(),
    mobilenumber:Joi.string().max(10).trim(),
    careerobjective:Joi.string().min(10).max(300).trim(),
    skills:Joi.array().items(Joi.string().min(1).trim().lowercase()).min(1),
    courses:Joi.array().items(Joi.string().min(1).trim().lowercase()).min(1),
    extracurricularactivities:Joi.array().items(Joi.string().min(1).trim()).min(1),
    additionaldetails:Joi.array().items(Joi.string().min(1).trim()).min(1),
    projects:Joi.array().items(
        Joi.object({
            socialmedia:Joi.string().min(3).max(150).trim(),
            link:Joi.string().min(3).uri().trim(),
        })
    ).optional(),
    sociallinks:Joi.array().items(
        Joi.object({
            title:Joi.string().min(3).max(150).trim(),
            link:Joi.string().min(3).uri().trim(),
        })
    ).optional(),
    education:Joi.array().items(
        Joi.object({
            degree:Joi.string().min(3).max(150).trim(),
            institution:Joi.string().min(3).max(150).trim(),
            year:Joi.string().min(3).max(150).trim(),
        })
    ).optional(),
    experience:Joi.array().items(
        Joi.object({
            company:Joi.string().min(3).max(150).trim().optional(),
            role:Joi.string().min(3).max(100).trim().optional(),
            years:Joi.string().min(1).max(3).trim().optional(),
        })
    ).optional(),
    address:Joi.object({
        city:Joi.string().trim().max(200),
        state:Joi.string().trim().max(200),
        country:Joi.string().trim().max(200),
    }).optional(),
    userId:Joi.string().trim().hex().length(24),
}).min(1);