import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { Router } from 'express';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.route('/').get(userController.getUsers).post(userController.postUser);

router
  .route('/:id')
  .get(userController.getUserByID)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
