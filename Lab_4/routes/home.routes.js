const {Router} = require('express')
const router = Router()
const controller = require('../controllers/home.controllers')

router.get('/', controller.index)
module.exports = router