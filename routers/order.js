const express=require('express')
const { createOrder, getAllOrder, getOrderDetail, updateOrder, getMyOrders } = require('../controllers/order')
const {authenticate}=require('../middlewares/authenticate')
const {authorization}=require('../middlewares/authorization')
const router=express.Router()
router.post('/orders',authenticate,createOrder)
router.get('/orders',getAllOrder)
router.get('/orders/:id',getOrderDetail)
router.patch('/orders/:id',updateOrder)
router.get('/myOrder',authenticate,getMyOrders)
//
module.exports=router