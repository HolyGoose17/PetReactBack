import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

const router = Router();
const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService);

router
  .post('/register', authController.register)
  .post('/login/', authController.loginUser);

router.get('/me', authMiddleware, authController.checkAuth);

export default router;
