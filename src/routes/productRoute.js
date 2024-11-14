const express = require('express');
const productRouter = express.Router();
const productController = require("../controllers/productControllers");

productRouter.post('/', productController.create);
productRouter.get('/',  productController.get);
productRouter.get('/:id',  productController.getById);

module.exports = productRouter;