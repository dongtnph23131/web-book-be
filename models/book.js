const mongoose = require('mongoose')
const mongoosePaginate=require('mongoose-paginate-v2')
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    stock: {
        type: Number,
        require: true
    },
    coverImage: {
        type: String,
        require: true
    },
    publishingCompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'PublishingCompany'
    },
    publicationData: {
        type: String,
        require: true
    },
    weight: {
        type: Number,
        require: true
    },
    numberPage: {
        type: Number,
        require: true
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Author'
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Category'
    },
    amountSlod:{
        type:Number,
        default:0
    },
    view:{
        type:Number,
        default:0
    }
}, {
    timestamps: true,
    versionKey: false
})
bookSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Book', bookSchema)