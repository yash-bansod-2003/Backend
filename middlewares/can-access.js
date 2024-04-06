const CustomErrorHandler = require('../services/custom-error-handler');

function canAccess(AuthorizeRoles) {
    return (req, res, next) => {
        const { role } = req.body;
        if (!AuthorizeRoles.includes(role)) {
            return next(CustomErrorHandler.unauthorize());
        }
        return next();
    };
}
module.exports = { canAccess };
