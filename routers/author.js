const expess=require('express')
const { authenticate } = require('../middlewares/authenticate')
const { authorization } = require('../middlewares/authorization')
const { addAuthor, getAllAuthor } = require('../controllers/author')
const router=expess.Router()

router.post('/authors',authenticate,authorization,addAuthor)
router.get('/authors',getAllAuthor)
module.exports=router