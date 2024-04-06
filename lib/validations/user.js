const Joi = require('joi');

const userCreateValidator = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    repeat_password: Joi.ref('password'),
});

const userLoginValidator = Joi.object({
    Email_ID: Joi.string(),
    Password: Joi.string(),
});

const userUpdateValidator = Joi.object({
    name: Joi.string(),
    role: Joi.string().valid('teacher', 'tpo'),
});

module.exports = {
    userCreateValidator,
    userLoginValidator,
    userUpdateValidator,
};
