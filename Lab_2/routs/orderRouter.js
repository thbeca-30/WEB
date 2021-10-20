const express = require('express');
const orderController = require('../controllers/orderController');
const orderRouter = express.Router();


orderRouter.use('/success', orderController.postOrder);
orderRouter.use('/delete/:_id', orderController.deleteOrder);
orderRouter.use('/', orderController.getOrder);

module.exports = orderRouter;