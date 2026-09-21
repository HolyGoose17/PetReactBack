import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { Router } from 'express';
import { UserService } from '../services/user.service';
import { authMiddleware } from '../middlewares/auth.middlewares';

const router = Router();
const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService);

router
  .post('/register', authController.register.bind(authController))
  .post('/login/', authController.loginUser.bind(authController));

router.get(
  '/me',
  authMiddleware,
  authController.checkAuth.bind(authController),
);

export default router;
