const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');

exports.postOrder = function(request, response){
    Cart.find({}, function(err, allCarts){
        if(err){
            console.log(err);
            return response.sendStatus(404);
        };
        var totalPrice = 0;
        allCarts.forEach(element => {
            totalPrice += element.product_price * element.product_quantity;
        });
        const order = new Order({total: totalPrice});
        allCarts.forEach(element => {
                order._carts.push(element);
        });
        order.save(function(err){
            if(err) return console.log(err);
            response.render('success.hbs');
        });
    });
    Cart.deleteMany({}, function(err){
        if(err){
            console.log(err);
            return response.sendStatus(404);
        }
    });
};


exports.getOrder = function(request, response){
    Order.find({}, function(err, allOrders){
        if (err) return response.sendStatus(404);
        response.render('order.hbs', {
            orders: allOrders
        });
    });
};

exports.deleteOrder = function(request, response){
    Order.findOne({_id: request.params._id}, function(err, order){
        if(err) return response.sendStatus(404);
        order._carts.forEach(element =>{
            Product.findOne({_id: element.product_id}, function(err, data){
                if (err) return response.sendStatus(404);
                Product.findOneAndUpdate({_id: element.product_id}, {quantity: data.quantity + element.product_quantity}, function(err){
                    if (err) return response.sendStatus(404);
                });
            });
        });
    });
    Order.deleteOne({_id: request.params._id}, function(err){
        if(err) return response.sendStatus(404);
        response.redirect('/order');
    });
}