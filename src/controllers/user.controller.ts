import { NextFunction, Request, Response } from 'express';

import { User, UserRole } from '@/entities/user.entity';
import { UserService } from '@/services/user.service';
import { AbstractIdParams, STATUS_CODE } from '@/utils/constants';

type UserResponseDTO = {
  id: string;
  login: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

function toUserResponse(user: User): UserResponseDTO {
  // Return an explicit public-field whitelist instead of serializing credential-bearing entities.
  return {
    id: user.id,
    login: user.login,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const role = req.query.role as UserRole | undefined;
      if (
        role !== undefined &&
        role !== UserRole.USER &&
        role !== UserRole.ADMIN
      ) {
        res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: 'Invalid role filter' });
        return;
      }
      const users = await this.userService.findUser(
        role === undefined ? {} : { role },
      );
      res.status(STATUS_CODE.OK).send(users.map(toUserResponse));
    } catch (error) {
      next(error);
    }
  };

  getUserByID = async (
    req: Request<AbstractIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.userService.findUserByID(req.params.id);

      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
        return;
      }
      res.status(STATUS_CODE.OK).json(toUserResponse(user));
    } catch (error) {
      next(error);
    }
  };

  postUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { login, password, role } = req.body ?? {};
      if (
        typeof login !== 'string' ||
        !login.trim() ||
        typeof password !== 'string' ||
        !password ||
        (role !== undefined &&
          role !== UserRole.USER &&
          role !== UserRole.ADMIN)
      ) {
        res.status(STATUS_CODE.BAD_REQUEST).json({
          message: 'Valid login, password, and role are required',
        });
        return;
      }

      const existingUser = await this.userService.findUserByLogin(login);

      if (existingUser) {
        res
          .status(STATUS_CODE.CONFLICT)
          .json({ message: 'User already exists' });
        return;
      }

      const user = await this.userService.createUser({ login, password, role });

      res.status(STATUS_CODE.CREATED).json(toUserResponse(user));
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (
    req: Request<AbstractIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const deleted = await this.userService.deleteUser(req.params.id);

      if (!deleted) {
        res.status(STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
        return;
      }

      res.status(STATUS_CODE.OK).json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (
    req: Request<AbstractIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { login, password, role } = req.body ?? {};
      if (
        (login !== undefined &&
          (typeof login !== 'string' || !login.trim())) ||
        (password !== undefined &&
          (typeof password !== 'string' || !password)) ||
        (role !== undefined &&
          role !== UserRole.USER &&
          role !== UserRole.ADMIN)
      ) {
        res.status(STATUS_CODE.BAD_REQUEST).json({
          message: 'Invalid user fields',
        });
        return;
      }

      const user = await this.userService.updateUser(req.params.id, {
        login,
        password,
        role,
      });

      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
        return;
      }

      res.status(STATUS_CODE.OK).json(toUserResponse(user));
    } catch (error) {
      next(error);
    }
  };
}
