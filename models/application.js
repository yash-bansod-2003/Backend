const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        jobPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobPost',
            required: true,
        },
    },
    { timestamps: true },
);

const JobApplicationModel = mongoose.model(
    'JobApplication',
    JobApplicationSchema,
    'jobApplications',
);

module.exports = JobApplicationModel;
