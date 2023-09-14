const mongoose = require("mongoose");
const mongoosePaginate=require('mongoose-paginate-v2')
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})
categorySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Category', categorySchema)