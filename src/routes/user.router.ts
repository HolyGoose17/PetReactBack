import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { Router } from 'express';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get('/users/', userController.getUsers.bind(userController))
.get('/check/', userController.check.bind(userController))
.get('/users/:id', userController.getUserByID.bind(userController))
.post('/users', userController.postUser.bind(userController))
.put('/users/:id', userController.updateUser.bind(userController))
.delete('/users/:id', userController.deleteUser.bind(userController))

export default router;
