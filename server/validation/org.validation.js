const Joi = require("joi");
exports.newOrgSchema = Joi.object({
    name:Joi.string().trim().required(),
    about:Joi.string().trim().max(500).required(),
    size:Joi.string().trim().required(),
    industry:Joi.string().lowercase().trim().required(),
    logo:Joi.string().uri().trim().required(),
    user:Joi.string().hex().length(24).trim().required(),
    socialLinks:Joi.array().items(
        Joi.object({
            title:Joi.string().trim().max(250).required(),
            link:Joi.string().uri().trim().required(),
        })
    ).required(),
})
exports.updateOrgSchema = Joi.object({
    name:Joi.string().trim().required(),
    about:Joi.string().trim().max(500),
    size:Joi.string().trim(),
    industry:Joi.string().lowercase().trim(),
    logo:Joi.string().uri().trim(),
    user:Joi.string().hex().length(24).trim(),
    socialLinks:Joi.array().items(
        Joi.object({
            title:Joi.string().trim().max(250),
            link:Joi.string().uri().trim(),
        })
    ),
}).min(1);