import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service';
import dotenv from 'dotenv';
import { SECRET_KEY, STATUS_CODE } from '../utils/constants';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userData = req.body;
      const result = await this.authService.login(userData);

      if (!result) {
        return res
          .status(STATUS_CODE.NOT_AUTHORYIZED)
          .json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        {
          id: result.userID,
          login: result.login,
        },
        SECRET_KEY,
        { expiresIn: '10s' },
      );

      return res.status(STATUS_CODE.OK).json({
        user: {
          id: result.userID,
          login: result.login,
          role: result.role,
        },
        token,
      });
    } catch (error) {
      return res
        .status(STATUS_CODE.INTERNAL_ERROR)
        .json({ message: 'Server error' });
    }
  }
}
