const expess=require('express')
const { authenticate } = require('../middlewares/authenticate')
const { authorization } = require('../middlewares/authorization')
const { addPublishingCompany } = require('../controllers/publishingCompany')
const router=expess.Router()

router.post('/publishingCompany',authenticate,authorization,addPublishingCompany)

module.exports=router