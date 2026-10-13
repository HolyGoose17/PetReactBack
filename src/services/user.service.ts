import { AppDataSource } from '@/config/data-source';
import { User, UserRole } from '@/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

type FilterUserDTO = {
  role?: UserRole;
};
type CreateUserDTO = {
  login: string;
  password: string;
  role?: UserRole;
};
type UpdateUserDTO = {
  login?: string;
  password?: string;
  role?: UserRole;
};

export class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findUser(filters: FilterUserDTO): Promise<User[]> {
    return this.userRepository.find({
      where: {
        ...filters,
      },
    });
  }

  async findUserByLogin(login: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { login } });
  }

  async findUserByID(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async createUser(body: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = this.userRepository.create({
      ...body,
      password: hashedPassword,
      role: body.role ?? UserRole.USER,
    });

    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.softDelete({ id });
    return (result.affected ?? 0) > 0;
  }

  async updateUser(id: string, body: UpdateUserDTO): Promise<User | null> {
    const user = await this.findUserByID(id);
    if (!user) {
      return null;
    }
    if (body.login !== undefined) {
      user.login = body.login;
    }
    if (body.password !== undefined) {
      user.password = await bcrypt.hash(body.password, 10);
    }
    if (body.role !== undefined) {
      user.role = body.role;
    }
    return this.userRepository.save(user);
  }
}
