import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { Router } from 'express';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router
  .route('/users')
  .get(userController.getUsers.bind(userController))
  .post(userController.postUser.bind(userController));

router
  .route('/users/:id')
  .get(userController.getUserByID.bind(userController))
  .put(userController.updateUser.bind(userController))
  .delete(userController.deleteUser.bind(userController));

export default router;
