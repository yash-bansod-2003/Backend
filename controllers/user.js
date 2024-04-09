const { UserModel } = require('../models/user');
const { CustomErrorHandler } = require('../services/custom-errorHandler');
const fs = require('node:fs');
const csvParser = require('csv-parser');
const { Roles, Secrets } = require('../lib/constants');
const jwt = require('jsonwebtoken');

const {
    userLoginValidator,
    userPasswordUpdateValidator,
    userRegisterValidator,
    userUpdateValidator,
} = require('../lib/validations/user');

async function register(req, res, next) {
    const { error } = userRegisterValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { Full_Name, Email_ID, Password } = req.body;

    try {
        const user = await UserModel.findOne({ Email_ID });

        if (user) {
            return next(CustomErrorHandler.conflict());
        }

        const createdUser = await UserModel.create({
            Email_ID,
            Password,
            Full_Name,
            Role: Roles.Teacher,
        });

        if (!createdUser) {
            return next(CustomErrorHandler.serverError());
        }

        return res.status(201).json(createdUser);
    } catch (error) {
        return next(error);
    }
}

async function uploadCsv(req, res, next) {
    if (!req.file) {
        return next(new CustomErrorHandler('File not uploaded', 422));
    }

    const results = [];

    try {
        fs.createReadStream(req.file.path)
            .pipe(csvParser())
            .on('data', (data) => {
                const cleanedData = Object.fromEntries(
                    Object.entries(data).map(([key, value]) => [
                        key,
                        value === 'NA' ? undefined : value,
                    ]),
                );
                results.push({
                    ...cleanedData,
                    Password: cleanedData.Mobile_Number,
                });
            })
            .on('end', async () => {
                await UserModel.insertMany(results);
                return res.status(201).json({ status: 'success' });
            });
    } catch (error) {
        return next(error);
    }
}

async function login(req, res, next) {
    const { error } = userLoginValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { Email_ID, Password } = req.body;

    try {
        const user = await UserModel.findOne({ Email_ID });

        if (!user) {
            return next(CustomErrorHandler.notFound());
        }

        const match = user.Password === Password;

        if (!match) {
            return next(CustomErrorHandler.wrongCredentials());
        }

        const accessToken = jwt.sign(
            { _id: user._id, role: user.Role },
            Secrets.Jwt,
            {
                algorithm: 'HS256',
                expiresIn: '2h',
            },
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 2,
        });

        return res.json(user);
    } catch (error) {
        return next(error);
    }
}

async function updatePassword(req, res, next) {
    const { error } = userPasswordUpdateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const { Email_ID, Password } = req.body;

    try {
        const user = await UserModel.findOne({ Email_ID });

        if (!user) {
            return next(CustomErrorHandler.notFound());
        }

        const passwordUpdatedUser = await UserModel.findOneAndUpdate(
            {
                Email_ID,
            },
            { Password },
        );

        return res.json(passwordUpdatedUser);
    } catch (error) {
        return next(error);
    }
}

async function index(req, res, next) {
    const Role = req.query?.role;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    try {
        const users = await UserModel.find({ Role: Role ?? Roles.Student })
            .skip(skip)
            .limit(limit);
        return res.json(users);
    } catch (error) {
        return next(error);
    }
}

async function indexOne(req, res, next) {
    const _id = req.params.id;

    if (!_id) {
        return next(CustomErrorHandler.serverError('id must provided'));
    }

    try {
        const user = await UserModel.findOne({ _id });
        return res.json(user);
    } catch (error) {
        return next(error);
    }
}

async function update(req, res, next) {
    const { error } = userUpdateValidator.validate(req.body);

    if (error) {
        return next(error);
    }

    const {
        Email_ID,
        SSC_Percentage,
        SSC_Year_Of_Passing,
        SSC_Board,
        HSC_Percentage,
        HSC_Year_Of_Passing,
        HSC_Board,
        Diploma_Branch,
        Diploma_Percentage,
        Diploma_Year_Of_Passing,
        Diploma_Board,
    } = req.body;

    try {
        const user = await UserModel.findOne({ Email_ID });

        if (!user) {
            return next(CustomErrorHandler.notFound());
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            {
                Email_ID,
            },
            {
                SSC_Percentage,
                SSC_Year_Of_Passing,
                SSC_Board,
                HSC_Percentage,
                HSC_Year_Of_Passing,
                HSC_Board,
                Diploma_Branch,
                Diploma_Percentage,
                Diploma_Year_Of_Passing,
                Diploma_Board,
            },
        );

        return res.json(updatedUser);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    register,
    login,
    updatePassword,
    uploadCsv,
    update,
    index,
    indexOne,
};
