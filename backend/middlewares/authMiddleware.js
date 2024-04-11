const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')
async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findOne({ _id: decoded.id }).select('-password')// Attach decoded user information to the request object
        next();
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Invalid token' });
        throw new Error('Not authorized')
    }
}

module.exports = { verifyToken }
