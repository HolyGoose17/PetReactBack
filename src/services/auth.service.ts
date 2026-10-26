import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, UserRole } from '@/entities/user.entity';
import { UserService } from '@/services/user.service';

type LoginDTO = {
  login: string;
  password: string;
};

type RegisterDTO = {
  login: string;
  password: string;
};

type AuthResult = {
  user: {
    id: string;
    login: string;
    role: UserRole;
  };
  token: string;
};

export class AuthService {
  constructor(private readonly userService: UserService) {}

  private getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    return secret;
  }

  private generateToken(user: User, secret: string): string {
    return jwt.sign(
      {
        id: user.id,
        login: user.login,
        role: user.role,
      },
      secret,
      { expiresIn: '1h' },
    );
  }

  async login(userData: LoginDTO): Promise<AuthResult | null> {
    if (!userData?.login || !userData?.password) return null;

    const user = await this.userService.findUserByLoginForAuthentication(
      userData.login,
    );
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isPasswordValid) return null;

    return this.toAuthResult(user);
  }

  async register(userData: RegisterDTO): Promise<AuthResult | null> {
    const secret = this.getJwtSecret();
    const existingUser = await this.userService.findUserByLogin(userData.login);
    if (existingUser) return null;

    const user = await this.userService.createUser(userData);

    return this.toAuthResult(user, secret);
  }

  async getMe(id: string): Promise<User | null> {
    return await this.userService.findUserByID(id);
  }

  private toAuthResult(
    user: User,
    secret: string = this.getJwtSecret(),
  ): AuthResult {
    return {
      user: {
        id: user.id,
        login: user.login,
        role: user.role,
      },
      token: this.generateToken(user, secret),
    };
  }
}
