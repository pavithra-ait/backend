const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'CrUd');
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
