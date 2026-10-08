import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { STATUS_CODE } from '@/utils/constants';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { login, password, role } = req.body;
      if (!login || !password) {
        res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: 'Login and password are required' });
        return;
      }

      const result = await this.authService.register({ login, password, role });
      if (!result) {
        res
          .status(STATUS_CODE.CONFLICT)
          .json({ message: 'User already exists' });
        return;
      }

      res.status(STATUS_CODE.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = (req as any).user.id;

      const user = await this.authService.getMe(userId);
      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
        return;
      }

      res.status(STATUS_CODE.OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
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
      next(error);
    }
  };
}
