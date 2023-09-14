const mongoose = require('mongoose')
const publishingCompanySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    authors:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }
    ]
},{
    timestamps:true,
    versionKey:false
})
module.exports=mongoose.model('PublishingCompany',publishingCompanySchema)