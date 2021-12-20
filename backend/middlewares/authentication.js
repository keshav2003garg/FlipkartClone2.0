const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const isAuthenticated = async (req, res, next) => {
    try {
        const { authToken } = req.cookies;
        if (!authToken) {
            res.status(401).json({
                success: false,
                message: "Please login to access this resource",
            });
        }
        const data = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = await User.findById(data.id);
        next();
    } catch (error) {
        if (!res.headersSent) {
            res.status(400).json({
                success: false,
                message: error.message,
            })
        };
    }
}

const authorizeRoles = (...roles) => {
    return (async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);
            if (!roles.includes(user.role)) {
                res.status(403).json({
                    success: false,
                    message: `${user.role} is not allowes to access this resource`
                });
            };
            next();
        } catch (error) {
            if (!res.headersSent) {
                res.status(400).json({
                    success: false,
                    message: error.message,
                })
            };
        }
    })
}

module.exports = { isAuthenticated, authorizeRoles };