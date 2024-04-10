const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    { timestamps: true },
);

const ApplicationModel = mongoose.model(
    'Application',
    applicationSchema,
    'applications',
);

module.exports = { ApplicationModel };
