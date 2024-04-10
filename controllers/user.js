const { UserModel } = require('../models/user');
const { PostModel } = require('../models/post');
const { ApplicationModel } = require('../models/application');

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
            domain: "localhost",
            sameSite: "strict",
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

async function self(req, res, next) {
    const _id = req.auth._id;

    if (!_id) {
        return next(CustomErrorHandler.serverError());
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

    const payload = req.body;

    try {
        const user = await UserModel.findOne({ Email_ID });

        if (!user) {
            return next(CustomErrorHandler.notFound());
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            {
                Email_ID,
            },
            payload,
        );

        return res.json(updatedUser);
    } catch (error) {
        return next(error);
    }
}

async function applied(req, res, next) {
    const { postId } = req.body;

    if (!postId) {
        return next(CustomErrorHandler.serverError());
    }

    try {
        const data = await ApplicationModel.find({
            post: postId,
        }).populate('student');

        const appliedStudents = data.map(item => item.student)
        return res.json(appliedStudents);
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

async function notApplied(req, res, next) {
    const { postId } = req.body;

    if (!postId) {
        return next(CustomErrorHandler.serverError());
    }

    try {
        const appliedStudents = await ApplicationModel.find({
            post: postId,
        }).populate('student');
        const allStudents = await UserModel.find({ Role: Roles.Student });
        const notAppliedStudents = allStudents.filter((student) => {
            return !appliedStudents.some((appliedStudent) =>
                appliedStudent.student._id.equals(student._id),
            );
        });
        return res.json(notAppliedStudents);
    } catch (error) {
        return next(error);
    }
}

async function appliedPosts(req, res, next) {
    const _id = req.auth._id;

    if (!_id) {
        return next(CustomErrorHandler.serverError());
    }

    try {
        const studentApplications = await ApplicationModel.find({
            student: _id,
        }).populate('post');
        const appliedPosts = studentApplications.map(
            (application) => application.post,
        );
        return res.json(appliedPosts);
    } catch (error) {
        return next(error);
    }
}

async function appliedStatus(req, res, next) {
    try {
        // Extract student ID and job post ID from request query parameters
        const { postId } = req.query;

        // Find if there is an application matching the student ID and job post ID
        const existingApplication = await ApplicationModel.findOne({ student: req.auth._id, post: postId });

        // If application exists, student has already applied for the job post
        const hasApplied = !!existingApplication;

        res.json({ hasApplied });
    } catch (error) {
        console.error('Error checking application status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function logout(req, res, next) {
    try {
        res.clearCookie("accessToken");
        return res.json({ id: req.auth._id });
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
    self,
    index,
    indexOne,
    applied,
    notApplied,
    logout,
    appliedPosts,
    appliedStatus
};
