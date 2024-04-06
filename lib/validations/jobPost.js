const Joi = require('joi');

const jobPostCreateValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().required(),
    teacher: Joi.string().required(),
});

const jobPostUpdateValidator = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    company: Joi.string(),
    location: Joi.string(),
});

module.exports = {
    jobPostCreateValidator,
    jobPostUpdateValidator,
};
