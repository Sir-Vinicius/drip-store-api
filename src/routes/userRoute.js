const userController = require('../controllers/userControllers')
const userMiddleware = require('../middlewares/userMiddleware')
const userRouter = require('express').Router();

userRouter.post('/', userMiddleware.validateUserCreate, userMiddleware.isEmailUsed, userController.registerUser);

userRouter.get('/:id', userMiddleware.checkUserExists, userController.getUser);

userRouter.put('/', userMiddleware.authenticateToken, userController.updateUser);

userRouter.delete('/', userMiddleware.authenticateToken, userController.deleteUser)

userRouter.post('/login', userMiddleware.validateUserLogin, userController.login); 


module.exports = userRouter;