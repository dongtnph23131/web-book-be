const express=require('express')
const { authenticate } = require('../middlewares/authenticate')
const { getProfile, updateProfile, updatePassword, forgotPassword, resetPassword } = require('../controllers/user')

const router=express.Router()

router.get('/getProfile',authenticate,getProfile)
router.patch('/updateProfile',authenticate,updateProfile)
router.patch('/updatePassword',authenticate,updatePassword)
router.post('/forgotPassword',forgotPassword)
router.patch('/resetpassword/:token',resetPassword)
module.exports=router