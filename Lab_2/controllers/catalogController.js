const Product = require('../models/product');

exports.getCatalog = function(request, response){
    Product.find({}, function(err, allProducts){
        if(err) return response.sendStatus(404);
        response.render('catalog.hbs', {
            products : allProducts
        });
    });
};

