const { PostModel } = require('../models/post');
const { CustomErrorHandler } = require('../services/custom-errorHandler');
const {
    postCreateValidator,
    postUpdateValidator,
} = require('../lib/validations/post');

async function create(req, res, next) {
    const { error } = postCreateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const payload = req.body;
    try {
        const post = await PostModel.create(payload);

        if (!post) {
            return next(CustomErrorHandler.serverError());
        }

        return res.status(201).json(post);
    } catch (err) {
        return next(err);
    }
}

async function index(req, res, next) {
    try {
        const posts = await PostModel.find();

        if (!posts) {
            return next(CustomErrorHandler.serverError());
        }

        return res.status(201).json(posts);
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
        const post = await PostModel.findOne({ _id });

        if (!post) {
            return next(CustomErrorHandler.notFound());
        }

        return res.status(201).json(post);
    } catch (err) {
        return next(err);
    }
}

async function update(req, res, next) {
    const _id = req.params.id;

    if (!_id) {
        return next(CustomErrorHandler.serverError('id is required param'));
    }

    const { error } = postUpdateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const payload = req.body;

    try {
        const post = await PostModel.find({ _id });

        if (!post) {
            return next(CustomErrorHandler.notFound());
        }

        const updatedPost = await PostModel.findOneAndUpdate(
            {
                _id,
            },
            payload,
        );

        if (!updatedPost) {
            return next(CustomErrorHandler.serverError('job post not updated'));
        }

        return res.status(201).json(updatedPost);
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
        const post = await PostModel.find({ _id });

        if (!post) {
            return next(CustomErrorHandler.notFound());
        }
        const deletedPost = await PostModel.findOneAndDelete({ _id });

        if (!deletedPost) {
            return next(CustomErrorHandler.serverError('job post not updated'));
        }

        return res.json(deletedPost);
    } catch (error) {
        return next(error);
    }
}

module.exports = { create, index, indexOne, update, remove };
