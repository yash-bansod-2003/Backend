const mongoose = require('mongoose');

const JobPostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
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
