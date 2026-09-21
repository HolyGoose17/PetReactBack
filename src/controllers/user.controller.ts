import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.userService.findUser(req.query);
      res.status(200).send(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getUserByID(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.userService.findUserByID(Number(req.params.id));

      if (!result) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async postUser(req: Request, res: Response): Promise<void> {
    try {
      const { login, password, role } = req.body;

      const existingUser = await this.userService.findUserByLogin(login);

      if (existingUser) {
        res.status(409).json({ message: 'User already exists' });
        return;
      }

      const user = await this.userService.createUser({ login, password, role });

      res.status(201).json({ user });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.userService.deleteUser(Number(req.params.id));
      res.status(200).json({ success: result });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.userService.updateUser(
        Number(req.params.id),
        req.body,
      );

      res.status(200).json({ success: result });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): void {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    res.status(500).json({ error: message });
  }
}
