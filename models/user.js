const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'member'
    },
    code: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Code'
        }
    ],
    brith: {
        type: String,
    },
    city:{
        type:String,
    },
    district:{
        type:String
    },
    ward:{
        type:String,
    },
    numberHome:{
        type:Number,
    },
    road:{
        type:String
    },
    phone: {
        type: Number
    },
    gender: {
        type: String,
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: String
    },
    passwordChangeAt:{
        type:String
    }
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('User', userSchema)