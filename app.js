const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const categoryRouter = require('./routers/category')
const authRouter = require('./routers/auth')
const authorRouter=require('./routers/author')
const bookRouter=require('./routers/book')
const publishingCompanyRouter=require('./routers/publishingCompany')
const userRouter=require('./routers/user')
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', categoryRouter)
app.use('/api', authRouter)
app.use('/api',authorRouter)
app.use('/api',bookRouter)
app.use('/api',publishingCompanyRouter)
app.use('/api',userRouter)
app.listen(8080, async () => {
    await mongoose.connect('mongodb+srv://donghaha:123456abc@ecommerce.ylijltl.mongodb.net/web-book?retryWrites=true', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Ok');
    })
})