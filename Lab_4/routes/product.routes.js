const {Router} = require('express')
const router = Router()
const controller = require('../controllers/product.controllers')

router.get('/', controller.getProducts)
router.post('/add', controller.postProducts)
router.post('/edit/:_id', controller.updateProduct)
router.delete('/delete/:_id', controller.deleteProduct)
router.get('/:_id', controller.getProduct)


module.exports = router