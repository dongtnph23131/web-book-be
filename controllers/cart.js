const Cart = require('../models/cart')

exports.getCartOfUser = async (req, res) => {
    try {
        const user = req.user
        const cart = await Cart.findOne({ userId: user._id })
        if (!cart) {
            await Cart.create({ userId: user._id })
            return res.status(200).json({
                message: 'Giỏ hàng trống',
                cart
            })
        }
        if (cart.items.length === 0) {
            return res.status(200).json({
                message: 'Giỏ hàng trống',
                cart
            })
        }
        return res.status(200).json({
            message: 'Lấy giỏ hàng thành công',
            cart
        })
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.addItemToCart = async (req, res) => {
    try {
        const { productId, productName, productPrice, productImage } = req.body
        const user = req.user
        const cart = await Cart.findOne({ userId: user._id })
        if (!cart) {
            const cartNew = await Cart.create({ userId: user._id })
            cartNew.items.push({ productId, productName, productPrice, productImage })
            cartNew.total = cartNew.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.productPrice, 0)
            await cartNew.save()
            return res.status(200).json({
                message: 'Sản phẩm đã thêm vào giỏ hàng'
            })
        }
        else {
            const itemExist = await cart.items.find(item => item.productId == productId)
            if (itemExist) {
                const itemUpdate = { ...itemExist, quantity: itemExist.quantity++ }
                cart.items = cart.items.map((item) => item.productId === productId ? itemUpdate : item)
                cart.total = cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.productPrice, 0)
                await cart.save()
                return res.status(200).json(cart)
            }
            else {
                cart.items.push({ productId, productName, productPrice, productImage })
                cart.total = cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.productPrice, 0)
                await cart.save()
                return res.status(200).json(cart)
            }
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.removeItemToCart = async (req, res) => {
    try {
        const { productId } = req.body
        const user = req.user
        const cart = await Cart.findOne({ userId: user._id })
        console.log(cart);
        const itemExist = await cart.items.find(item => item.productId == productId)
        if (itemExist.quantity > 1) {
            const itemUpdate = { ...itemExist, quantity: itemExist.quantity-- }
            console.log(itemUpdate);
            cart.items = cart.items.map((item) => item.productId === productId ? itemUpdate : item)
            cart.total = cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.productPrice, 0)
            await cart.save()
            return res.status(200).json(cart)
        }
        else {
            cart.items = cart.items.filter((item) => item.productId != productId)
            cart.total = cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.productPrice, 0)
            await cart.save()
            return res.status(200).json(cart)
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.removeItem = async (req, res) => {
    try {
        const { productId } = req.body
        const user = req.user
        const cart = await Cart.findOne({ userId: user._id })
        const itemExist = await cart.items.find(item => item.productId == productId)
        if (itemExist) {

            cart.items = cart.items.filter((item) => item.productId != productId)
            cart.total = cart.items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.productPrice, 0)
            await cart.save()
            return res.status(200).json(cart)
        }
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
exports.removeCart=async (req, res) => {
    try {
        const user = req.user
        const cart = await Cart.findOne({ userId: user._id })
        cart.items = [];
        await cart.save({ validateBeforeSave: false });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}