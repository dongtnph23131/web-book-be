const express=require('express')
const { authenticate } = require('../middlewares/authenticate')
const {authorization}=require('../middlewares/authorization')
const { create, addCouponsToUser, searchCouponsAdmin } = require('../controllers/coupons')
const router=express.Router()

router.post('/coupons',authenticate,authorization,create)
router.post('/coupons/add/user',authenticate,authorization,addCouponsToUser)
router.get('/coupons/search/admin',searchCouponsAdmin)
module.exports=router