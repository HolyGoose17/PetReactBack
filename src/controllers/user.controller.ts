import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { Repository, getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../utils/constants';

export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.userService.findUsers(req.query);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decoded: any = jwt.verify(token, SECRET_KEY);

      const user = await this.userService.findUserByID(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  }

  async getUserByID(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.userService.findUserByID(Number(req.params.id));
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    } finally {
      next();
    }
  }

  async postUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { login, password, role } = req.body;

      if (!login || !password) {
        return res
          .status(400)
          .json({ message: 'Login and password are required' });
      }

      const existingUser = await this.userService.findUserByLogin(login);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const user = await this.userService.createUser({ login, password, role });

      const token = jwt.sign(
        { id: user.userID, login: user.login, role: user.role },
        SECRET_KEY,
        { expiresIn: '10s' },
      );

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      next();
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.userService.deleteUser(Number(req.params.id));
      res.status(200).json({ success: result });
    } catch (error) {
      res.status(500).send(error);
    } finally {
      next();
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.userService.updateUser(
        Number(req.params.id),
        req.body,
      );

      res.status(200).json({ success: result });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
