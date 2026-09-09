import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { Router } from 'express';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.get('/users/', userController.getUsers.bind(userController));
router.get('/check/', userController.check.bind(userController));
router.get('/users/:id', userController.getUserByID.bind(userController));
router.post('/users', userController.postUser.bind(userController));
router.put('/users/:id', userController.updateUser.bind(userController));
router.delete('/users/:id', userController.deleteUser.bind(userController));

export default router;
