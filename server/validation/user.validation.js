const Joi = require("joi");

exports.userRegisterSchema = Joi.object({
    name:Joi.string().trim().lowercase().required(),
    email:Joi.string().email().trim().required(),
    password:Joi.string().trim().required(),
})

exports.userLoginSchema = Joi.object({
    email:Joi.string().email().trim().required(),
    password:Joi.string().trim().required(),
})

