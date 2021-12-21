const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sentjwt = require('../utils/sendjwt');
const sendEmail = require('../utils/sendEmail');
const { isAuthenticated, authorizeRoles} = require('../middlewares/authentication');
const User = require('../models/user.model');



router.post('/register', async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name: name,
            email: email,
            password: securedPassword,
            avatar: avatar,
        });
        sentjwt(res, user, "Registered Successfully", 201);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        };

        sentjwt(res, user, "Login Successfully", 200);
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.get('/logout', async (req, res) => {
    try {
        res.status(200).cookie("authToken", null, { expires: new Date(Date.now()) }).json({
            success: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        })
    }
})


router.post('/forgot-password', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "No user exist with given Email address",
            });
        };

        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        try {
            await sendEmail({
                email: user.email,
                subject: "Flipkart Password Recovery",
                message: `No need to worry, you can reset your Flipkart password by clicking the link below: \n ${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken} \n The link will expire in 15 min \n If you didn't request a password reset, feel free to delete this email and carry on enjoying your shopping \n All the best \n The Flipkart Team`,
            });
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpiry = undefined;
            await user.save();
            res.status(500).json({
                message: error.message,
            })
        }
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.put('/reset-password/:token', async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

        let user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpiry: { $gt: Date.now() } });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "Reset link is invalid or has been expired",
            });
        };

        let { password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            res.status(400).json({
                success: false,
                message: "Password doesn't match",
            });
        };

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        user.password = securedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        sentjwt(res, user, "Password Reset Successfully", 200);
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
})


router.get('/me', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            userDetail: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
});


router.put('/update-password', isAuthenticated, async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findById(req.user.id).select("+password");

        const comparePassword = await bcrypt.compare(oldPassword, user.password);
        if (!comparePassword) {
            res.status(401).json({
                success: false,
                message: "You entered incorrect Old Password",
            });
        };

        if (newPassword != confirmPassword) {
            res.status(400).json({
                success: false,
                message: "Password doesn't match",
            });
        };

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(newPassword, salt);
        user.password = securedPassword;
        await user.save();

        sentjwt(res, user, "Password Updated Successfully", 200);
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.put('/update-profile', isAuthenticated, async (req, res) => {
    try {
        const { name, email, avatar } = req.body;

        await User.findByIdAndUpdate(req.user.id, { name, email, avatar }, { new: true, runValidators: true });

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
})


router.get('/admin/get-all-users', isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            allUsers: users,
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.get('/admin/get-details/:id', isAuthenticated, authorizeRoles("admin"), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(400).json({
                success: false,
                message: `User doesn't exist with ${req.params.id} id`,
            });
        }

        res.status(200).json({
            success: true,
            userDetail: user,
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.put('/admin/update-role/:id', isAuthenticated, authorizeRoles("admin"), async (req, res)=>{
    try {
        const { role } = req.body;

        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });
        if(!user){
            res.status(400).json({
                success: false,
                message: `User doesn't exist with ${req.params.id} id`,
            });
        };

        res.status(200).json({
            success: true,
            message: "Role Updated Successfully",
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


router.delete('/admin/delete-user/:id', isAuthenticated, authorizeRoles("admin"), async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(400).json({
                success: false,
                message: `User doesn't exist with ${req.params.id} id`,
            });
        }

        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        };
    }
});


module.exports = router;