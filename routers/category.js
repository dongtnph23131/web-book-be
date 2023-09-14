const express=require('express')
const { addCategory } = require('../controllers/category')
const {authenticate}=require('../middlewares/authenticate')
const {authorization}=require('../middlewares/authorization')
const router=express.Router()
router.post('/categories',authenticate,authorization,addCategory)
module.exports=router