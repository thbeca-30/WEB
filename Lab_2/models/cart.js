const mongoose = require('mongoose');
var findOneOrCreate = require('mongoose-find-one-or-create')
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    product_id: String,
    product_title: String,
    product_price: Number,
    product_quantity: Number,
    
})
cartSchema.plugin(findOneOrCreate);
module.exports = mongoose.model('Cart', cartSchema)