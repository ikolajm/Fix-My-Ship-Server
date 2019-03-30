const jwt = require('jsonwebtoken'),
      User = require('../models/User');

const validateSession = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        const token = req.headers.authorization;

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (decoded) {
                User.findById(decoded._id)
                .then(foundUser => {
                    console.log('Auth pass!')
                    req.user = foundUser;
                    next();
                })
                .catch(err => console.log('Auth failure!'))
            } else {
                res.send('Authorization failed, session expired or user not logged in!')
            }
        })
    }
}

module.exports = validateSession;