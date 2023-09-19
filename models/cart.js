const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            productName: {
                type: String,
            },
            productImage: {
                type: String
            },
            productPrice: {
                type: Number,
            },
            quantity: {
                type: Number,
                default: 1
            },
        }
    ],
    total: {
        type: Number,
    }
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Cart', cartSchema)