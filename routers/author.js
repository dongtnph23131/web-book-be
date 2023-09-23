const expess=require('express')
const { authenticate } = require('../middlewares/authenticate')
const { authorization } = require('../middlewares/authorization')
const { addAuthor, getAllAuthor, getOneAuthor } = require('../controllers/author')
const router=expess.Router()

router.post('/authors',authenticate,authorization,addAuthor)
router.get('/authors',getAllAuthor)
router.get('/authors/:id',getOneAuthor)
module.exports=router