const express = require('express')
const { authenticate } = require('../middlewares/authenticate')
const { getCartOfUser, addItemToCart, removeItemToCart, removeItem } = require('../controllers/cart')
const router = express.Router()
router.get('/cart', authenticate, getCartOfUser)
router.post('/cart', authenticate, addItemToCart)
router.post('/cart/removeProductItem', authenticate, removeItemToCart)
router.post('/cart/removeItem', authenticate, removeItem)
module.exports = router