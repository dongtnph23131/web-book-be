const Coupons=require('../models/coupons')
const User = require('../models/user');

exports.create = async (req, res) => {
    try {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        function generateString(length) {
            let result = ' ';
            const charactersLength = characters.length;
            console.log(charactersLength);
            for (let i = 0; i < length; i++) (result += characters.charAt(Math.floor(Math.random() * charactersLength)))
            return result;
        };
        const generateStringValue = generateString(5)
        const coupons = await Coupons.findOne({ name: generateStringValue })
        if (coupons) {
            return res.status(400).json({
                message: 'Phiếu giảm giá đã tồn tại'
            })
        }
        const data = await Coupons.create({ ...req.body, name: generateStringValue })
        return res.status(200).json({
            message: 'Tạo phiếu giảm giá thành công',
            data
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.addCouponsToOrder = async (req, res) => {
    try {
        const coupons = await Coupons.findOne({ name: req.body.code })
        if (!coupons) {
            return res.status(400).json({
                message: 'Phiếu giảm giá không đúng'
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.addCouponsToUser = async (req, res) => {
    try {
        const coupons = await Coupons.findById(req.body.code)
        if (!coupons) {
            return res.status(400).json({
                message: 'Phiếu giảm giá không đúng'
            })
        }
        if (coupons.statusDonation) {
            return res.status(400).json({
                message: 'Phiếu giảm đã được tặng'
            })
        }
        if (coupons.statusUsage) {
            return res.status(400).json({
                message: 'Phiếu giảm giá đã được sủ dụng'
            })
        }
        const user = await User.findById(req.body.userId)
        if (!user) {
            return res.status(400).json({
                message: 'Tài khoản không tồn tại'
            })
        }
        coupons.statusDonation = true;
        await coupons.save()
        await User.findByIdAndUpdate(user._id, {
            $addToSet: {
                couponsId: coupons._id
            }
        })

        return res.status(200).json({
            message: 'Tặng phiếu giảm giá thành công'
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.searchCouponsAdmin = async (req, res) => {
    try {
        console.log(req.query.search);
        const data = await Coupons.findOne({
            name: req.query.search,
        })
        const dataCoupons = new Date(data.expiration_date)
        const dataNow = new Date()
        if (dataNow > dataCoupons) {
            return res.status(400).json({
                message: 'Mã giảm giá hết hạn'
            })
        }
        if (data.statusUsage === true) {
            return res.status(400).json({
                message: 'Phiếu giảm gía đã được sử dụng'
            })
        }
        if (data.statusDonation === true) {
            return res.status(400).json({
                message: 'Phiếu giảm gía đã được tặng'
            })
        }
        if (!data) {
            return res.status(400).json({
                message: 'Phiếu giảm gía không tồn tại'
            })
        }
        return res.status(200).json(data)
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.useCouponsClient = async (req, res) => {
    try {
        const data = await Coupons.findOne({
            name: req.query.search,
        })
        if (!data) {
            return res.status(400).json({
                message: 'Phiếu giảm gía không tồn tại'
            })
        }
        const dataCoupons = new Date(data.expiration_date)
        const dataNow = new Date()
        if (dataNow > dataCoupons) {
            return res.status(400).json({
                message: 'Mã giảm giá hết hạn'
            })
        }
        if (data.statusUsage === true) {
            return res.status(400).json({
                message: 'Phiếu giảm gía đã được sử dụng'
            })
        }
        const user=await User.findById(req.user._id)
        const couponsItem=user.couponsId.find(item=>{
            const coupons=JSON.stringify(item)
            const coupons_id=JSON.stringify(data._id)
            return coupons===coupons_id
        })
        if(!couponsItem){
            return res.status(400).json({
                message:'Mã giảm giá không đúng'
            })
        }
        const dataCouponsRes=await Coupons.findById(couponsItem)
        return res.status(200).json(dataCouponsRes)
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}