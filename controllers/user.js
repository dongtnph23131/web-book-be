const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto-js')
const nodemailer = require('nodemailer')
exports.getProfile = async (req, res) => {
    try {
        const userLogger = req.user;
        return res.status(200).json({
            message: 'Lấy thông tin cá nhân thành công',
            user: userLogger
        })

    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.updateProfile = async (req, res) => {
    const user = req.user
    try {
        const userLogger = req.user;
        const userUpdate = await User.findByIdAndUpdate(userLogger._id, req.body, {
            new: true
        })
        const token = jwt.sign({ id: user._id }, "dongtimo", {
            expiresIn: '1d'
        })
        return res.status(200).json({
            message: 'Cập nhập thông tin cá nhân thành công',
            user: userUpdate,
            token
        })

    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}
exports.updatePassword = async (req, res) => {
    try {
        const user = req.user;
        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu hiện tại không đúng"
            })
        }
        const token = jwt.sign({ id: user._id }, "dongtimo", {
            expiresIn: '1d'
        })
        const hashPassword = await bcrypt.hash(req.body.newPassword, 10)
        const newUser = await User.findByIdAndUpdate(user._id, {
            password: hashPassword,
            passwordChangeAt: Date.now()
        }, {
            new: true
        })
        user.password = undefined
        return res.status(200).json({
            message: "Đổi mật khẩu thành công",
            newUser,
            token
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

}
exports.forgotPassword = async (req, res) => {
    try {
        const email = req.body.email
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                message: "Email chưa được đăng ký"
            })
        }
        const resetToken = crypto.lib.WordArray.random(32).toString();
        user.passwordResetToken = crypto.SHA256(resetToken, 'dongcute').toString();
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
        await user.save({ validateBeforeSave: false })
        const message = `Mã đổi mật khẩu của bạn là ${resetToken}. Mã đổi mật khẩu có hiệu lực 1 phút`
        const transporter = nodemailer.createTransport({
            tls: {
                rejectUnauthorized: false
            },
            service: 'gmail',
            auth: {
                user: 'tranngocdong2042003@gmail.com',
                pass: 'kaivhxsscgiuiosp'
            }

        });
        const mailOptions = {
            from: 'tranngocdong2042003@gmail.com',
            to: req.body.email,
            subject: 'FORGOT PASSWORD',
            text: message
        }
        try {
            await transporter.sendMail(mailOptions)
            return res.status(200).json({
                status: "success",
                message: "Token sent to email"
            })
        }
        catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({ validateBeforeSave: false });
        }
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
exports.resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.SHA256(req.params.token, 'dongcute').toString();
        const user = await User.findOne({
            passwordResetToken: hashedToken,
        })
        const userExits = await User.findOne({
            passwordResetExpires: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({
                message: "Mã đổi mật khẩu không chính xác"
            })
        }
        if (!userExits) {
            return res.status(400).json({
                message: "Mã đổi mật khẩu hết hạn"
            })
        }
        const handlePass = await bcrypt.hash(req.body.password, 10)
        user.password = handlePass;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined
        user.passwordChangeAt = Date.now();
        await user.save({ validateBeforeSave: false })
        const token = jwt.sign({ id: user._id }, "dongtimo", {
            expiresIn: '1d'
        })
        user.password = undefined
        return res.status(200).json({
            message: "Mật khẩu mới được cập nhâp",
            user,
            token
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}