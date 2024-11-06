const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed', err);
            return res.sendStatus(403);
        }
        req.user = user;
        console.log('User authenticated:', user);
        next();
    });
}

module.exports = authenticate;
