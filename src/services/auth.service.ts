import bcrypt from 'bcrypt';
import { User } from '../entities/user';
import { UserService, CreateUserDTO } from './user.service';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(userData: CreateUserDTO): Promise<User | null> {
    if (!userData?.login || !userData?.password) return null;

    const user = await this.userService.findUserByLogin(userData.login);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isPasswordValid) return null;

    return user;
  }

  async register(
    userData: CreateUserDTO,
  ): Promise<{ user: User; token: string } | null> {
    const existingUser = await this.userService.findUserByLogin(userData.login);
    if (existingUser) return null;

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.userService.createUser({
      ...userData,
      password: hashedPassword,
    });

    const secret = process.env.JWT_SECRET || 'your_super_secret_key';
    const token = jwt.sign(
      { id: user.id, login: user.login, role: user.role },
      secret,
      { expiresIn: '1h' },
    );

    return { user, token };
  }

  async getMe(userId: number): Promise<User | null> {
    return await this.userService.findUserByID(userId);
  }
}
