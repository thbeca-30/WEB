const {Schema, model, Types} = require('mongoose')
var findOneOrCreate = require('mongoose-findoneorcreate')

const schema = new Schema({
    product_id: String,
    product_title: String,
    product_price: Number,
    product_quantity: Number,
    owner: {type: Types.ObjectId, ref: "User"}
})
schema.plugin(findOneOrCreate)
module.exports = model("Cart", schema)