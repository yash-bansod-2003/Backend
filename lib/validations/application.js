const Joi = require('joi');

const applicationCreateValidator = Joi.object({
    student: Joi.string().required(),
    jobPost: Joi.string().required(),
});

module.exports = { applicationCreateValidator };
