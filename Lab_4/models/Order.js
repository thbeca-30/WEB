const {Schema, model, Types} = require('mongoose')

const order = new Schema({
    _carts: [{
        product_id: String,
        product_title: String,
        product_price: Number,
        product_quantity: Number
    }],
    total: Number,
    owner: {type: Types.ObjectId, ref: "User"}

})

module.exports = model("Order", order)