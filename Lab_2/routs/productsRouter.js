const express = require('express');
const productsController = require('../controllers/productsController');
const productsRouter = express.Router();

productsRouter.use('/postproduct', productsController.postProduct);
productsRouter.use('/create',productsController.addProduct);
productsRouter.use('/delete/:_id', productsController.deleteProduct);
productsRouter.use('/edit/:_id', productsController.updateProduct);
productsRouter.use('/edit', productsController.updateProduct1);
productsRouter.use('/', productsController.getProducts);

module.exports = productsRouter;