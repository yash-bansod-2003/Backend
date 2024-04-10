const Joi = require('joi');

const applicationCreateValidator = Joi.object({
    post: Joi.string().required(),
});

module.exports = { applicationCreateValidator };
