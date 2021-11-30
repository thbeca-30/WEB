const Product = require('../models/product');
const Cart = require('../models/cart');


exports.takeToCart = function(request, response){
    Product.findOne({_id: request.params._id}, function(err, data){
        if(data.quantity == 0){
            response.render('alert.hbs');
        }else{
            if(err) return response.sendStatus(404);
            Cart.findOneOrCreate({product_id: data._id},{product_id: data._id, product_title: data.title, product_price: data.price, product_quantity: 0}, function(err, _cart){
                if(err) return response.sendStatus(404);
                const newCart = {product_id: data._id, product_title: data.title, product_price: data.price, product_quantity: _cart.product_quantity + 1};
                Cart.findOneAndUpdate({product_id : data._id}, newCart, {new : true}, function(err){
                    if(err) return response.sendStatus(404);
                    response.redirect('/catalog');
                });
            });

            const newProduct = {title : data.title, description : data.description, price : data.price, quantity : data.quantity - 1};
            Product.findOneAndUpdate({_id : data._id}, newProduct, {new : true}, function(err){
                if(err) return response.sendStatus(404);
            });
        };       
    });
};


exports.plusToCart = function(request, response){
    Product.findOne({_id: request.params._id}, function(err, data){
        if(data.quantity == 0){
            response.render('alert.hbs');
        }else{
            if(err) return response.sendStatus(404);
            Cart.findOne({product_id: data._id}, function(err, _cart){
                if(err) return response.sendStatus(404);
                const newCart = {product_id: data._id, product_title: data.title, product_price: data.price, product_quantity: _cart.product_quantity + 1};
                Cart.findOneAndUpdate({product_id : data._id}, newCart, {new : true}, function(err){
                    if(err) return response.sendStatus(404);
                    response.redirect('/cart');
                });
            });
            
            const newProduct = {title : data.title, description : data.description, price : data.price, quantity : data.quantity - 1};
            Product.findOneAndUpdate({_id : data._id}, newProduct, {new : true}, function(err){
                if(err) return response.sendStatus(404);
            });
        };       
    });
};


exports.minusToCart = function(request, response){
    Product.findOne({_id: request.params._id}, function(err, data){
            if(err) return response.sendStatus(404);
            Cart.findOne({product_id: data._id}, function(err, _cart){
                if(err) return response.sendStatus(404);
                if(_cart.product_quantity != 1){
                    const newCart = {product_id: data._id, product_title: data.title, product_price: data.price, product_quantity: _cart.product_quantity - 1};
                    Cart.findOneAndUpdate({product_id : data._id}, newCart, {new : true}, function(err){
                        if(err) return response.sendStatus(404);      
                    });
                }else{
                    Cart.deleteOne({product_id : data._id}, function(err){
                        if(err) return response.sendStatus(404);
                    });
                };  
                const newProduct = {title : data.title, description : data.description, price : data.price, quantity : data.quantity + 1};
                        Product.findOneAndUpdate({_id : data._id}, newProduct, {new : true}, function(err){
                            if(err) return response.sendStatus(404);
                        }); 
                        response.redirect('/cart');
            });      
    });
};


exports.getCart = function(request, response){
    Cart.find({}, function(err, allCarts){
        if(err){
            console.log(err);
            return response.sendStatus(404);
        }
        var totalPrice = 0;
        allCarts.forEach(element => {
            totalPrice += element.product_price * element.product_quantity;
        });
        response.render('cart.hbs',{
            carts : allCarts,
            total : totalPrice
        });
       
        
    });
};


exports.deleteCart = function(request, response){
    Cart.find({}, function(err, allCarts){
        if(err) return response.sendStatus(404);
        allCarts.forEach(element =>{
            Product.findOne({_id: element.product_id}, function(err, data){
                if (err) return response.sendStatus(404);
                Product.findOneAndUpdate({_id: element.product_id}, {quantity: data.quantity + element.product_quantity}, function(err){
                    if (err) return response.sendStatus(404);
                });
            });
        });
    });
    Cart.deleteMany({}, function(err){
        if (err) return response.sendStatus(404);
        response.redirect('/cart');
    });
};