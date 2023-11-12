const Order = require('../models/order')
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create({ ...req.body, user: req.user._id })
        return res.status(200).json({
            message: 'Đặt hàng thành công',
            data: order
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.getAllOrder = async (req, res) => {
    try {
        const data = await Order.find()
        return res.status(200).json({
            data
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.getOrderDetail = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        return res.status(200).json({
            data: order
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.updateOrder=async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        return res.status(200).json({
            message:'Cập nhập trạng thái đơn hàng thành công',
            data: order
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.getMyOrders=async (req, res) => {
    try {
        const order=await Order.find({user:req.params.userId})
        return res.status(200).json({
            data: order
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}