import { Users } from '../entities/user';
import { Repository, getRepository } from 'typeorm';

type FilterUserDTO = {
  role?: string;
};
type CreateUserDTO = {
  login: string;
  password: string;
  role?: string;
};
type UpdateUserDTO = {
  login?: string;
  password?: string;
  role?: string;
};

export class UserService {
  private users: Repository<Users>;

  async allUsers(): Promise<Users[]> {
    this.users = getRepository(Users);
    return await this.users.find();
  }

  async findUsers(filters: FilterUserDTO): Promise<Users[]> {
    this.users = getRepository(Users);
    return await this.users.find({
      where: {
        ...filters,
      },
    });
  }

  async findUserByLogin(login: string): Promise<Users | null> {
    this.users = getRepository(Users);
    return await this.users.findOne({ where: { login } });
  }

  async findUserByID(id: number): Promise<Users | null> {
    this.users = getRepository(Users);
    return await this.users.findOne({ where: { userID: id } });
  }

  async createUser(body: CreateUserDTO): Promise<Users> {
    this.users = getRepository(Users);

    const user = this.users.create({
      ...body,
      isDeleted: false,
      role: body.role || 'USER',
    });

    return await this.users.save(user);
  }

  async deleteUser(userID: number): Promise<boolean> {
    this.users = getRepository(Users);
    const result = await this.users.delete({ userID });
    return (result.affected ?? 0) > 0;
  }

  async updateUser(id: number, body: UpdateUserDTO): Promise<boolean> {
    this.users = getRepository(Users);
    const result = await this.users.update({ userID: id }, body);
    return (result.affected ?? 0) > 0;
  }
}
