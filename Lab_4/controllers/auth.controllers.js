const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')

exports.registration = async (req, res) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при регистрации'
            })
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }
        const hashPassword =  await bcrypt.hash(password, 12)
        const user = new User({email, password: hashPassword})
        await user.save()
        res.status(201).json({message: 'Пользователь успешно создан'})
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.login = async (req, res) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при входе в систему'
            })
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message: 'Пользователь не найден!'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            return
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        res.json({token, userId: user.id})
    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }

}