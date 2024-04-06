const Joi = require('joi');
const UserModel = require('../models/user');
const CustomErrorHandler = require('../services/custom-error-handler');
const {
    userCreateValidator,
    userLoginValidator,
    userUpdateValidator,
} = require('../lib/validations/user');

async function register(req, res, next) {
    const { error } = userCreateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { name, email, password, role } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        console.log(user);

        if (user) {
            return next(
                CustomErrorHandler.alreadyExists('user already exists'),
            );
        }

        const createUser = await UserModel.create({
            name,
            email,
            password,
            role,
        });

        if (!createUser) {
            return next(CustomErrorHandler.serverError('user not created'));
        }

        return res.json(createUser);
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

async function login(req, res, next) {
    const { error } = userLoginValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return next(CustomErrorHandler.notFound('user not found'));
        }

        const match = user.password === password;

        if (!match) {
            return next(
                CustomErrorHandler.wrongCredentials('wrong credentials'),
            );
        }

        return res.json(user);
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

async function update(req, res, next) {
    const _id = req.params.id;

    if (!_id) {
        return next(CustomErrorHandler.serverError('id is required param'));
    }

    const { error } = userUpdateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { name, role } = req.body;

    try {
        const user = await UserModel.findOne({ _id });

        if (!user) {
            return next(CustomErrorHandler.notFound('user not found'));
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            {
                _id,
            },
            {
                name,
                role,
            },
        );

        if (!updatedUser) {
            return next(CustomErrorHandler.serverError('user not created'));
        }

        return res.json(updatedUser);
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

async function remove(req, res, next) {
    const _id = req.params.id;

    if (!_id) {
        return next(CustomErrorHandler.serverError('id is required param'));
    }

    try {
        const user = await UserModel.findOne({ _id });

        if (!user) {
            return next(CustomErrorHandler.notFound('user not found'));
        }

        const deletedUser = await UserModel.findOneAndDelete({ _id });

        if (!deletedUser) {
            return next(CustomErrorHandler.serverError('user not deleted'));
        }

        return res.json(deletedUser);
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

module.exports = { register, login, update, remove };
