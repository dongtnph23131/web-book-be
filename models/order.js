const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    userNameReceive: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    node: {
        type: String
    },
    orderItems: [
        {
            quantity: {
                type: Number,
                required: true,
            },
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: Number,
        default: 0
    },
    pay: {
        type: Boolean,
        default: false
    },
    totalOrder: {
        type: Number,
        required: true
    },
    payMent:{
         type:String,
         required:true
    },
},
    {
        timestamps: true,
        versionKey: false
    }
)
module.exports = mongoose.model('Order', orderSchema)