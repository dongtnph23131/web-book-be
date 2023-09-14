const expess=require('express')
const { authenticate } = require('../middlewares/authenticate')
const { authorization } = require('../middlewares/authorization')
const { addAuthor } = require('../controllers/author')
const router=expess.Router()

router.post('/authors',authenticate,authorization,addAuthor)

module.exports=router