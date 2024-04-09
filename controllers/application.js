const JobApplicationModel = require('../models/application');
const CustomErrorHandler = require('../services/custom-errorHandler');

const {
    jobApplicationCreateValidator,
} = require('../lib/validations/application');

async function create(req, res, next) {
    const { error } = jobApplicationCreateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { student, jobPost } = req.body;
    try {
        const jobApplication = await JobApplicationModel.create({
            student,
            jobPost,
        });

        if (!jobApplication) {
            return next(
                CustomErrorHandler.serverError('job application not created'),
            );
        }

        return res.status(201).json(jobApplication);
    } catch (err) {
        return next(err);
    }
}

async function index(req, res, next) {
    try {
        const jobApplications = await JobApplicationModel.find();

        if (!jobApplications) {
            return next(CustomErrorHandler.serverError());
        }

        return res.status(201).json(jobApplications);
    } catch (err) {
        return next(err);
    }
}

async function indexStudentApplications(req, res, next) {
    const studentId = req.params.id;

    try {
        const jobApplications = await JobApplicationModel.find({
            student: studentId,
        });

        if (!jobApplications) {
            return next(CustomErrorHandler.serverError());
        }

        return res.status(201).json(jobApplications);
    } catch (err) {
        return next(err);
    }
}

async function indexOne(req, res, next) {
    const _id = req.params.id;

    if (!_id) {
        return next(CustomErrorHandler.serverError('id is required param'));
    }

    try {
        const jobApplication = await JobApplicationModel.find({ _id });

        if (!jobApplication) {
            return next(CustomErrorHandler.notFound());
        }

        return res.status(201).json(jobApplication);
    } catch (err) {
        return next(err);
    }
}

async function remove(req, res, next) {
    const _id = req.params.id;

    if (!_id) {
        return next(CustomErrorHandler.serverError('id is required param'));
    }

    try {
        const jobApplication = await JobApplicationModel.find({ _id });

        if (!jobApplication) {
            return next(CustomErrorHandler.notFound());
        }
        const deletedJobApplication =
            await JobApplicationModel.findOneAndDelete({ _id });

        if (!deletedJobApplication) {
            return next(
                CustomErrorHandler.serverError('job application not updated'),
            );
        }

        return res.json(deletedJobApplication);
    } catch (error) {
        return next(error);
    }
}

module.exports = { create, index, indexOne, remove, indexStudentApplications };
