const mongoose = require('mongoose')
const couponsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    value:{
        type:Number,
        require:true
    },
    min_purchase_amount: {
        type: Number,
        required: true
    },
    expiration_date: {
        type: Date,
        required: true
    },
    statusDonation:{
        type:Boolean,
        default:false
    },
    statusUsage:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
    versionKey:false
})
module.exports = mongoose.model('Counpons', couponsSchema)