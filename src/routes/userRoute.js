const userController = require('../controllers/userControllers')
const userMiddleware = require('../middlewares/userMiddleware')
const userRouter = require('express').Router();

userRouter.post('/', userMiddleware.validateUserInput, userMiddleware.isEmailUsed, userController.registerUser);

userRouter.get('/:id', userController.getUser);

userRouter.put('/', userMiddleware.authenticateToken, userMiddleware.validateUserInput, userController.updateUser);

// userRouter.delete('/', userMiddleware.authenticateToken, userMiddleware.checkUserExists, userController.deleteUser)

// userRouter.post('/login', userMiddleware.validateUserInput, userController.login); 


module.exports = userRouter;