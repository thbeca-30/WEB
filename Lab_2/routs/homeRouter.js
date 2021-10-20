const express = require('express');
const homeController = require('../controllers/homeController.js');
const homeRouter = express.Router();

homeRouter.get('/', homeController.index);
homeRouter.use('/about', homeController.about);

module.exports = homeRouter;