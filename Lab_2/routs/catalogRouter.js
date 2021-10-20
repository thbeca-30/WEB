const express = require('express');
const catalogController = require('../controllers/catalogController');
const catalogRouter = express.Router();


catalogRouter.use('/', catalogController.getCatalog);

module.exports = catalogRouter;
