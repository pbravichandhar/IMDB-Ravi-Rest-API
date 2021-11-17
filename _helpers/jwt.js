const expressJwt = require('express-jwt');
const { getById } = require('../services/user.service');

module.exports = jwt;

function jwt() {
    const secret = process.env.JWT_SECRET;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/login',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    
    done({req: {...req, user}});
};