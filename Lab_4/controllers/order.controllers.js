const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Product = require('../models/Product')

exports.postOrder = function(request, response){
    Cart.find({owner: request.user.userId}, function(err, allCarts){
        if(err){
            console.log(err)
            return response.sendStatus(404)
        };
        var totalPrice = 0
        allCarts.forEach(element => {
            totalPrice += element.product_price * element.product_quantity
        })
        const order = new Order({total: totalPrice, owner: request.user.userId})
        allCarts.forEach(element => {
            order._carts.push(element)
        })
        order.save(function(err){
            if(err) return console.log(err)
            //response.render('success.hbs')
        })
    })
    Cart.deleteMany({owner: request.user.userId}, function(err){
        if(err){
            console.log(err)
            return response.sendStatus(404)
        }
    })
    response.status(201).json({message: "Заказ успешно создан"})
}

exports.getOrder = async (req, res) => {
    const orders = await Order.find({owner: req.user.userId})
    res.json(orders)
    //response.status(201).json({message: "Заказ успешно загружен"})
}

exports.deleteOrder = function(request, response){
    Order.findOne({_id: request.params._id, owner: request.user.userId}, function(err, order){
        if(err) return response.sendStatus(404)
        order._carts.forEach(element =>{
            Product.findOne({_id: element.product_id}, function(err, data){
                if (err) return response.sendStatus(404)
                Product.findOneAndUpdate({_id: element.product_id}, {quantity: data.quantity + element.product_quantity}, function(err){
                    if (err) return response.sendStatus(404)
                })
            })
        })
    })
    Order.deleteOne({_id: request.params._id, owner: request.user.userId}, function(err){
        if(err) return response.sendStatus(404)
        //response.redirect('/order')
        response.status(201).json({message: 'Заказ успешно удален'})
    })
}