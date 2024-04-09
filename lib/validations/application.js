const Joi = require('joi');

const jobApplicationCreateValidator = Joi.object({
    student: Joi.string().required(),
    jobPost: Joi.string().required(),
});

module.exports = { jobApplicationCreateValidator };
