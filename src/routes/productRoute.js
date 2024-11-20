const express = require('express');
const productRouter = express.Router();
const productController = require("../controllers/productControllers");
const { authenticateToken } = require('../middlewares/userMiddleware');

productRouter.post('/', authenticateToken, productController.create);
productRouter.get('/',  productController.getAll);
productRouter.get('/marks', productController.getMarksFromProducts);
productRouter.put('/:id', authenticateToken, productController.updateProduct);
productRouter.get('/:id',  productController.getById);
productRouter.delete('/:id', authenticateToken, productController.deleteProduct)




module.exports = productRouter;