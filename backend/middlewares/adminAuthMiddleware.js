const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { loginAdmin } = require('../controllers/adminController');

async function verifyAdminToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded.id }).select('-password');
        req.user = user;
        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Access forbidden' });
        }
        next();
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Invalid token' });
        throw new Error('Not authorized');
    }
}

module.exports = { verifyAdminToken };
