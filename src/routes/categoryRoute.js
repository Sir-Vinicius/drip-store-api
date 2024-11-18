const categoryController = require('../controllers/categoryControllers');
const { authenticateToken } = require('../middlewares/userMiddleware');

const categoryRouter = require('express').Router();

categoryRouter.get('/:id', categoryController.getById);
categoryRouter.get('/', categoryController.getAll);
categoryRouter.post('/', authenticateToken, categoryController.create);
categoryRouter.delete('/:id', authenticateToken, categoryController.deleteCategory)
categoryRouter.put('/:id', authenticateToken, categoryController.updateCategory)
module.exports = categoryRouter;