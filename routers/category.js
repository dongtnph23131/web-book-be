const express=require('express')
const { addCategory, getOneCategory, getAllCategory} = require('../controllers/category')
const {authenticate}=require('../middlewares/authenticate')
const {authorization}=require('../middlewares/authorization')
const router=express.Router()
router.post('/categories',authenticate,authorization,addCategory)
router.get('/categories/:id',getOneCategory)
router.get('/categories',getAllCategory)
module.exports=router