const mongoose = require('mongoose')

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
    }
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Book', bookSchema)