const { getUser } = require('../services/auth')

function checkForAuth(req, res, next) {
    req.user = null;
    const tokenCookie = req.cookies?.token;
    if (!tokenCookie) {
        return next();
    }
    const token = tokenCookie;
    const user = getUser(token)
    req.user = user;
    next();

}
// admin 
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login');

        if (!roles.includes(req.user.role)) return res.end('Unauthorized!');
        return next();


    }
}

module.exports = { restrictTo, checkForAuth };



