const { CustomErrorHandler } = require('../services/custom-errorHandler');

const canAccess = (roles) => {
    return (req, res, next) => {
        const roleFromToken = req.auth.role;

        if (!roles.includes(roleFromToken)) {
            return next(new CustomErrorHandler.unauthorize());
        }

        return next();
    };
};

module.exports = { canAccess };
