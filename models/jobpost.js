const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema(
    {
        company_Name: {
            type: String,
            required: true,
        },
        company_description: {
            type: String,
            required: true,
        },
        website_Link: {
            type: String,
            required: false,
        },
        job_Description: {
            type: String,
            required: true,
        },
        job_Position: {
            type: String,
            required: true,
        },
        job_Type: {
            type: String,
            required: true,
        },
        salary: {
            type: String,
            required: true,
        },
        vacancy: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        qualification: {
            type: String,
        },
        skills: {
            type: String,
            required: true
        },
        experience: {
            type: String,
            default: "fresher"
        },
        selection_Process: {
            type: String,
        },
        terms_and_conditions: {
            type: String,
        },
        registration_Link: {
            type: String,
        },
        deadline: {
            type: String,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true },
);

const JobPostModel = mongoose.model('JobPost', JobPostSchema, 'jobposts');

module.exports = JobPostModel;
