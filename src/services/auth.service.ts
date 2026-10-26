import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';

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

type JwtExpiresIn = Extract<SignOptions['expiresIn'], string>;

function isJwtExpiresIn(value: string): value is JwtExpiresIn {
  return /^\d+(?:\s?(?:milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y))?$/i.test(
    value,
  );
}

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
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    if (!isJwtExpiresIn(expiresIn)) {
      throw new Error('JWT_EXPIRES_IN must be a valid duration, for example 1h');
    }

    return jwt.sign(
      {
        id: user.id,
        login: user.login,
        role: user.role,
      },
      secret,
      { expiresIn },
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
