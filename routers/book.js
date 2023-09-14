const express=require('express')
const { addBook, getAllBook } = require('../controllers/book')
const {authenticate}=require('../middlewares/authenticate')
const {authorization}=require('../middlewares/authorization')
const router=express.Router()
router.post('/books',authenticate,authorization,addBook)
router.get('/books',getAllBook)
module.exports=router