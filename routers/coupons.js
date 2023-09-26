const express=require('express')
const { authenticate } = require('../middlewares/authenticate')
const {authorization}=require('../middlewares/authorization')
const { create, addCouponsToUser,getCoupons } = require('../controllers/coupons')
const router=express.Router()

router.post('/coupons',authenticate,authorization,create)
router.post('/coupons/add/user',authenticate,authorization,addCouponsToUser)
router.get('/coupons/search',getCoupons)
module.exports=router