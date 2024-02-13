const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.authMiddleware = async (req, res, next) => {
    const token = res.cookies['auth'];

    if (!token) {
       return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;
        res.locals.isAuthenticated = true;

        next();
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}