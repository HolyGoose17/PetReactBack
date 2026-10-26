import { Router } from 'express';

import { UserController } from '@/controllers/user.controller';
import { requireAdmin } from '@/middlewares/auth.middlewares';
import { UserService } from '@/services/user.service';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.use(requireAdmin);

router.route('/').get(userController.getUsers).post(userController.postUser);

router
  .route('/:id')
  .get(userController.getUserByID)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
