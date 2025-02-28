const Joi = require("joi");
exports.saveJobSchema = Joi.object({
    user:Joi.string().hex().length(24).required(),
    job:Joi.string().hex().length(24).required(),
});