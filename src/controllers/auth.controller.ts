import { Request, Response } from 'express';

import { AuthService } from '@/services/auth.service';
import { STATUS_CODE } from '@/utils/constants';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    const { login, password } = req.body ?? {};
    if (
      typeof login !== 'string' ||
      !login.trim() ||
      typeof password !== 'string' ||
      !password
    ) {
      res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({ message: 'Login and password are required' });
      return;
    }

    const result = await this.authService.register({ login, password });
    if (!result) {
      res.status(STATUS_CODE.CONFLICT).json({ message: 'User already exists' });
      return;
    }

    res.status(STATUS_CODE.CREATED).json(result);
  };

  checkAuth = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(STATUS_CODE.NOT_AUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }

    const user = await this.authService.getMe(req.user.id);
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json({
      id: user.id,
      login: user.login,
      role: user.role,
    });
  };

  loginUser = async (req: Request, res: Response): Promise<void> => {
    const { login, password } = req.body ?? {};

    if (
      typeof login !== 'string' ||
      typeof password !== 'string' ||
      !login.trim() ||
      !password
    ) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: 'Login and password are required',
      });
      return;
    }

    const result = await this.authService.login({ login, password });

    if (!result) {
      res
        .status(STATUS_CODE.NOT_AUTHORIZED)
        .json({ message: 'Invalid credentials' });
      return;
    }

    res.status(STATUS_CODE.OK).json(result);
  };
}
