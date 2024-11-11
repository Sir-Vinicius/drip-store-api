const userController = require('../controllers/userControllers')
const userMiddeware = require('../middlewares/userMiddleware')
const userRouter = require('express').Router();

userRouter.post('/', userMiddeware.validateUserInput, userController.registerUser);
userRouter.get('/:id', userMiddeware.checkUserExists, userController.getUser);
userRouter.put('/:id', userController.editUser);


module.exports = userRouter;