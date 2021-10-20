const Product = require('../models/product.js');
exports.addProduct = function(request, response){
    response.render('create.hbs');
};

exports.getProducts = function(request, response){
    Product.find({}, function(err, allProducts){
        if(err){
            console.log(err);
            return response.sendStatus(404);
        }
        response.render('products.hbs',{
            products : allProducts
        });
    });
};

exports.updateProduct = function(request, response){
    Product.findOne({_id:request.params._id}, function(err, data){
        if(err) return console.log(err);
        response.render('edit.hbs',{
            product : data
        });
    });
};

exports.updateProduct1 = function(request, response){
    if(!request.body) return response.sendStatus(404);
        const product_id = request.body._id;
        const productTitle = request.body.title;
        const productDescription = request.body.description;
        const productPrice = request.body.price;
        const productQuantity = request.body.quantity;
        const newProduct = {title : productTitle, description : productDescription, price : productPrice, quantity : productQuantity};
        Product.findOneAndUpdate({_id : product_id}, newProduct, {new : true}, function(err){
            if(err) return response.sendStatus(404);
            response.redirect('/products');
        });
};


exports.deleteProduct = function(request, response){
    Product.deleteOne({_id:request.params._id}, function(err){
        if(err){
            console.log(err);
            return response.sendStatus(404);
        }
        response.redirect('/products');
    });
};



exports.postProduct  = function(request, response){


    const productTitle = request.body.title;
    const productDescription = request.body.description;
    const productPrice = request.body.price;
    const productQuantity = request.body.quantity;
    const product = new Product({title : productTitle, description : productDescription, price : productPrice, quantity : productQuantity});
    product.save(function(err){
        if(err) return console.log(err);
        response.redirect('/products');
    });
};


