const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const hbs = require('hbs');


hbs.registerPartials(__dirname + '/views/partials');
const homeRouter = require('./routs/homeRouter');


const productsRouter = require('./routs/productsRouter');
const catalogRouter = require('./routs/catalogRouter');
const orderRouter = require('./routs/orderRouter');
const cartRouter = require('./routs/cartRouter');


app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));



app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/catalog', catalogRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);


app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});
 
mongoose.connect("mongodb://localhost:27017/Shop", { useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});