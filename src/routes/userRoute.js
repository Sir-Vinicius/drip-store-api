const userController = require('../controllers/userControllers')
const userRouter = require('express').Router();

userRouter.post('/', userController.create);
userRouter.get('/:id',  userController.getById);

module.exports = userRouter;