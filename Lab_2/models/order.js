const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const order = new Schema({
         _carts: [{
                product_id: String,
                product_title: String,
                product_price: Number,
                product_quantity: Number
        }],
        total: Number

});

module.exports = mongoose.model("Order", order);