const Joi = require('joi');

const postCreateValidator = Joi.object({
    company_Name: Joi.string().required(),
    company_description: Joi.string().required(),
    website_Link: Joi.string().optional(),
    job_Description: Joi.string().required(),
    job_Position: Joi.string().required(),
    job_Type: Joi.string().required(),
    salary: Joi.string().required(),
    vacancy: Joi.string().required(),
    location: Joi.string().required(),
    qualification: Joi.string().optional(),
    skills: Joi.string().required(),
    experience: Joi.string().default('fresher'),
    selection_Process: Joi.string().optional(),
    terms_and_conditions: Joi.string().optional(),
    registration_Link: Joi.string().optional(),
    deadline: Joi.string().optional(),
    teacher: Joi.string().required(),
    role: Joi.string().optional(),
});

const postUpdateValidator = Joi.object({
    company_Name: Joi.string().optional(),
    company_description: Joi.string().optional(),
    website_Link: Joi.string().optional(),
    job_Description: Joi.string().optional(),
    job_Position: Joi.string().optional(),
    job_Type: Joi.string().optional(),
    salary: Joi.string().optional(),
    vacancy: Joi.string().optional(),
    location: Joi.string().optional(),
    qualification: Joi.string().optional(),
    skills: Joi.string().optional(),
    experience: Joi.string().optional(),
    selection_Process: Joi.string().optional(),
    terms_and_conditions: Joi.string().optional(),
    registration_Link: Joi.string().optional(),
    deadline: Joi.string().optional(),
    teacher: Joi.string().optional(),
    role: Joi.string().optional(),
});

module.exports = {
    postCreateValidator,
    postUpdateValidator,
};
