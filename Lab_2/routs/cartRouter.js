const express = require('express');
const cartController = require('../controllers/cartController');
const cartRouter = express.Router();

cartRouter.use('/minus/:_id', cartController.minusToCart);
cartRouter.use('/plus/:_id', cartController.plusToCart);
cartRouter.use('/delete', cartController.deleteCart);
cartRouter.use('/:_id', cartController.takeToCart);
cartRouter.use('/', cartController.getCart);

module.exports = cartRouter;