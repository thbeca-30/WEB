const Product = require('../models/Product')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.postProducts = async (req, res) => {
    try {
        const {title, description, price, quantity} = req.body
        const product = new Product({title, description, price, quantity})
        await product.save()
        res.status(201).json({message: 'Товар успешно добавлен'})
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.getProduct = async (req,res) => {
    try {
        const product = await Product.findOne({_id: req.params._id});
        res.json(product)
        console.log(product)
        //res.status(201).json({message: 'Товар успешно найден'})
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const newProduct = {title : req.body.title, description : req.body.description, price : req.body.price, quantity : req.body.quantity}
        await Product.findOneAndUpdate({_id: req.params._id}, newProduct, {new : true})
        return res.status(201).json({message: 'Товар успешно обновлен'})
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }

}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.deleteOne({_id: req.params._id})
        console.log("Удалено")
        return res.status(201).json({message: 'Товар успешно удален'})
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}