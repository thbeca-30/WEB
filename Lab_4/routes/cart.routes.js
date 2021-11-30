const {Router} = require('express')
const router = Router()
const controller = require('../controllers/cart.controllers')
const auth = require('../middleware/auth.middleware')

router.delete('/delete/:_id', auth, controller.deleteCart)
router.delete('/delete', auth, controller.deleteCarts)
router.get('/:_id', auth, controller.takeToCart)
router.get('/', auth, controller.getCart)




module.exports = router