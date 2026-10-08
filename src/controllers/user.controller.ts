import { NextFunction, Request, Response } from 'express';
import { UserService } from '@/services/user.service';
import { STATUS_CODE } from '@/utils/constants';

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.userService.findUser(req.query);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  getUserByID = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.userService.findUserByID(Number(req.params.id));

      if (!result) {
        res.status(STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
        return;
      }
      res.status(STATUS_CODE.OK).json(result);
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
      const { login, password, role } = req.body;

      const existingUser = await this.userService.findUserByLogin(login);

      if (existingUser) {
        res
          .status(STATUS_CODE.CONFLICT)
          .json({ message: 'User already exists' });
        return;
      }

      const user = await this.userService.createUser({ login, password, role });

      res.status(STATUS_CODE.CREATED).json({ user });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.userService.deleteUser(Number(req.params.id));
      res.status(STATUS_CODE.OK).json({ success: result });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.userService.updateUser(
        Number(req.params.id),
        req.body,
      );

      res.status(STATUS_CODE.OK).json({ success: result });
    } catch (error) {
      next(error);
    }
  };
}
