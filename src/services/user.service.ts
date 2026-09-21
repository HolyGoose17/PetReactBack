import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

export type FilterUserDTO = {
  role?: string;
};
export type CreateUserDTO = {
  login: string;
  password: string;
  role?: string;
};
export type UpdateUserDTO = {
  login?: string;
  password?: string;
  role?: string;
};

export class UserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async allUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUser(filters: FilterUserDTO): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        ...filters,
      },
    });
  }

  async findUserByLogin(login: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { login } });
  }

  async findUserByID(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(body: CreateUserDTO): Promise<User> {
    body.password = await bcrypt.hash(body.password, 10);
    const user = this.userRepository.create({
      ...body,
      role: body.role || 'USER',
    });

    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async updateUser(id: number, body: UpdateUserDTO): Promise<boolean> {
    const result = await this.userRepository.update({ id }, body);
    return (result.affected ?? 0) > 0;
  }
}
