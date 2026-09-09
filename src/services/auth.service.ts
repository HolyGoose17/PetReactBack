import { Users } from '../entities/user';
import { Repository, getRepository } from 'typeorm';

export class AuthService {
  private users: Repository<Users>;

  async login(user): Promise<Users | null> {
    if (user && user?.login && user?.password) {
      this.users = getRepository(Users);
      const result = await this.users.findOne({
        where: {
          login: user.login,
          password: user.password,
          isDeleted: false,
        },
      });
      return result;
    }
    return null;
  }
}
