import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { Router } from 'express';

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/login/', authController.loginUser.bind(authController));

export default router;
