const JobPostModel = require('../models/jobpost');
const CustomErrorHandler = require('../services/custom-error-handler');
const {
    jobPostCreateValidator,
    jobPostUpdateValidator,
} = require('../lib/validations/jobPost');

async function create(req, res, next) {
    const { error } = jobPostCreateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { title, description, company, location, teacher } = req.body;
    try {
        const jobPost = await JobPostModel.create({
            title,
            description,
            company,
            location,
            teacher,
        });

        if (!jobPost) {
            return next(CustomErrorHandler.serverError('job post not created'));
        }

        return res.status(201).json(jobPost);
    } catch (err) {
        return next(err);
    }
}

async function index(req, res, next) {
    try {
        const jobPosts = await JobPostModel.find();

        if (!jobPosts) {
            return next(CustomErrorHandler.serverError());
        }

        return res.status(201).json(jobPosts);
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
        const jobPost = await JobPostModel.find({ _id });

        if (!jobPost) {
            return next(CustomErrorHandler.notFound());
        }

        return res.status(201).json(jobPost);
    } catch (err) {
        return next(err);
    }
}

async function update(req, res, next) {
    const _id = req.params.id;

    if (!_id) {
        return next(CustomErrorHandler.serverError('id is required param'));
    }

    const { error } = jobPostUpdateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { title, description, company, location } = req.body;
    try {
        const jobPost = await JobPostModel.find({ _id });

        if (!jobPost) {
            return next(CustomErrorHandler.notFound());
        }

        const updatedJobPost = await JobPostModel.findOneAndUpdate(
            {
                _id,
            },
            {
                title,
                description,
                company,
                location,
            },
        );

        if (!updatedJobPost) {
            return next(CustomErrorHandler.serverError('job post not updated'));
        }

        return res.status(201).json(updatedJobPost);
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
        const jobPost = await JobPostModel.find({ _id });

        if (!jobPost) {
            return next(CustomErrorHandler.notFound());
        }
        const deletedJobPost = await JobPostModel.findOneAndDelete({ _id });

        if (!deletedJobPost) {
            return next(CustomErrorHandler.serverError('job post not updated'));
        }

        return res.json(deletedJobPost);
    } catch (error) {
        return next(error);
    }
}

module.exports = { create, index, indexOne, update, remove };
