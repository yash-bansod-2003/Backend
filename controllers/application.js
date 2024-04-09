const { ApplicationModel } = require('../models/application');
const { CustomErrorHandler } = require('../services/custom-errorHandler');

const {
    applicationCreateValidator,
} = require('../lib/validations/application');

async function create(req, res, next) {
    const { error } = applicationCreateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { post } = req.body;
    try {
        const application = await ApplicationModel.create({
            student: req.auth._id,
            post,
        });

        if (!application) {
            return next(CustomErrorHandler.serverError());
        }

        return res.status(201).json(application);
    } catch (err) {
        return next(err);
    }
}

async function index(req, res, next) {
    try {
        const applications = await ApplicationModel.find();

        if (!applications) {
            return next(CustomErrorHandler.serverError());
        }

        return res.status(201).json(applications);
    } catch (err) {
        return next(err);
    }
}

async function indexOne(req, res, next) {
    const _id = req.params.id;

    if (!_id) {
        return next(CustomErrorHandler.serverError());
    }

    try {
        const application = await ApplicationModel.find({ _id });

        if (!application) {
            return next(CustomErrorHandler.notFound());
        }

        return res.status(201).json(application);
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
        const application = await ApplicationModel.find({ _id });

        if (!application) {
            return next(CustomErrorHandler.notFound());
        }
        const deletedapplication = await ApplicationModel.findOneAndDelete({
            _id,
        });

        if (!deletedapplication) {
            return next(
                CustomErrorHandler.serverError('job application not updated'),
            );
        }

        return res.json(deletedapplication);
    } catch (error) {
        return next(error);
    }
}

module.exports = { create, index, indexOne, remove };
