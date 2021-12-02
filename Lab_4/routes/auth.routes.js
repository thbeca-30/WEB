const {Router} = require("express")
const {check} = require('express-validator')
const controller = require('../controllers/auth.controllers')
const router = Router()

router.post('/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля - 6 символов').isLength({min: 6})
    ], controller.registration
    )
router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ], controller.login
    )

module.exports = router