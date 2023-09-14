const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    story: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    publishingCompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PublishingCompany',
        require:true
    }
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('Author', authorSchema)