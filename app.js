const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(cors())
app.listen(8080, async () => {
    await mongoose.connect('mongodb+srv://donghaha:123456abc@ecommerce.ylijltl.mongodb.net/web-book?retryWrites=true', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Ok');
    })
})