import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { STATUS_CODE } from '../utils/constants';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { login, password, role } = req.body;
      if (!login || !password) {
        res.status(400).json({ message: 'Login and password are required' });
        return;
      }

      const result = await this.authService.register({ login, password, role });
      if (!result) {
        res.status(409).json({ message: 'User already exists' });
        return;
      }

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async checkAuth(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;

      const user = await this.authService.getMe(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.authService.login(req.body);

      if (!result) {
        res
          .status(STATUS_CODE.NOT_AUTHORIZED)
          .json({ message: 'Invalid credentials' });
        return;
      }

      const secretKey = process.env.SECRET_KEY || 'my_secret_key';

      const token = jwt.sign(
        {
          id: result.id,
          login: result.login,
          role: result.role,
        },
        secretKey,
        { expiresIn: '1h' },
      );

      res.status(STATUS_CODE.OK).json({
        user: {
          id: result.id,
          login: result.login,
          role: result.role,
        },
        token,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Server error';
      res.status(STATUS_CODE.INTERNAL_ERROR).json({ message });
    }
  }
}
