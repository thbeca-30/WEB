const Cart = require("../models/Cart")
const Product = require("../models/Product")


exports.getCart = async (req, res) =>{
    try{
        //console.log("Первый этап есть")
        var totalPrice = 0
        const carts = await Cart.find({owner: req.user.userId})
        res.json(carts)
        //console.log("Второй этап тоже")
    }catch{
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.takeToCart = async (req, res) => {
    try{
        console.log("Запрос принят(take to cart)")
        const data = await Product.findOne({_id: req.params._id})
            if(data.quantity === 0){
                console.log("Что то не так")
            }else{
                console.log(data)
                //if(err) return res.sendStatus(500);
                const _cart = await Cart.findOneOrCreate({product_id: data._id, owner: req.user.userId},{product_id: data._id, product_title: data.title, product_price: data.price, product_quantity: 0, owner: req.user.userId})
                    //if(err) return res.sendStatus(500);
                    const newCart = {product_id: data._id, product_title: data.title, product_price: data.price, product_quantity: _cart.product_quantity + 1, owner: req.user.userId}
                    await Cart.findOneAndUpdate({product_id : data._id, owner: req.user.userId}, newCart, {new : true})//, function (err){
                        //if(err) return res.sendStatus(500)
                        //response.redirect('/catalog')
                    //})
                //})
                const newProduct = {title : data.title, description : data.description, price : data.price, quantity : data.quantity - 1}
                await Product.findOneAndUpdate({_id : data._id}, newProduct, {new : true})//, function (err){
                    //if(err) return res.sendStatus(500)
                //})
                console.log("Запрос выполнен")
                res.status(201).json({message: "Добавлен в корзину"})
            }
        //})
    }catch{
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.deleteCart = function(request, response){
    try{
        Cart.findOne({_id: request.params._id, owner: request.user.userId}, function(err, cart){
            if(err) return response.status(500).json({message: "Первый шаг не выполнен"})
            //allCarts.forEach(element =>{
            Product.findOne({_id: cart.product_id}, function(err, data){
                //if(err) return response.status(500).json({message: "Второй шаг не выполнен"})
                Product.findOneAndUpdate({_id: cart.product_id}, {quantity: data.quantity + cart.product_quantity}, function(err){
                    if(err) return response.status(500).json({message: "Третий шаг не выполнен"})
                    Cart.deleteOne({_id: request.params._id, owner: request.user.userId}, function (err){
                        if(err) return response.status(500).json({message: "Четвертый шаг не выполнен"})
                    })
                })
            })
            //})
        })

        response.status(201).json({message: "Элемент корзины удален"})
    }catch{
        response.status(500).json({message: "Нулевой шаг не выполнен"})
    }

}

exports.deleteCarts = function(request, response){
    Cart.find({owner: request.user.userId}, function(err, allCarts){
        if(err) return response.sendStatus(404)
        allCarts.forEach(element =>{
            Product.findOne({_id: element.product_id}, function(err, data){
                if (err) return response.sendStatus(404)
                Product.findOneAndUpdate({_id: element.product_id}, {quantity: data.quantity + element.product_quantity}, function(err){
                    if (err) return response.sendStatus(404)
                })
            })
        })
    })
    Cart.deleteMany({owner: request.user.userId}, function(err){
        if (err) return response.sendStatus(404)
        //response.redirect('/cart');
        response.status(201).json({message: "Корзина удалена"})
    })
}
