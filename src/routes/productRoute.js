const express = require('express');
const productRouter = express.Router();
const productController = require("../controllers/productControllers");
const { authenticateToken } = require('../middlewares/userMiddleware');

productRouter.post('/', authenticateToken, productController.create);
productRouter.put('/:id', authenticateToken, productController.updateProduct);
productRouter.get('/',  productController.getAll);
productRouter.get('/:id',  productController.getById);



module.exports = productRouter;