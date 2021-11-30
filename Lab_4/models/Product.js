const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    quantity: Number
});

module.exports = mongoose.model("Product", productSchema);