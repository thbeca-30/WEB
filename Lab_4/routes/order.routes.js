const {Router} = require('express')
const router = Router()
const controller = require('../controllers/order.controllers')
const auth = require('../middleware/auth.middleware')

router.delete('/delete/:_id', auth, controller.deleteOrder)
router.post('/success', auth, controller.postOrder)
router.get('/', auth, controller.getOrder)
module.exports = router