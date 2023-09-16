const expess=require('express')
const { authenticate } = require('../middlewares/authenticate')
const { authorization } = require('../middlewares/authorization')
const { addPublishingCompany, getAllPublishingCompany } = require('../controllers/publishingCompany')
const router=expess.Router()

router.post('/publishingCompany',authenticate,authorization,addPublishingCompany)
router.get('/publishingCompany',getAllPublishingCompany)
module.exports=router