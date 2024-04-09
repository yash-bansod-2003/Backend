const { expressjwt } = require('express-jwt');
const { Roles, Secrets } = require('../lib/constants');

module.exports = expressjwt({
    secret: Secrets.Jwt,
    algorithms: ['HS256'],
    getToken(req) {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.split(' ')[1] !== undefined) {
            const token = authHeader.split(' ')[1];
            if (token) {
                return token;
            }
        }

        const { accessToken: token } = req.cookies;
        return token;
    },
});
