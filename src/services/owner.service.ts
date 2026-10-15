import { AppDataSource } from '@/config/data-source';
import { Owner } from '@/entities/owner.entity';
import { Repository } from 'typeorm';

type FilterOwnerDTO = {
  name?: string;
};
type CreateOwnerDTO = {
  name: string;
};
type UpdateOwnerDTO = {
  name?: string;
};

export class OwnerService {
  private readonly ownerRepository: Repository<Owner>;

  constructor() {
    this.ownerRepository = AppDataSource.getRepository(Owner);
  }

  async findOwner(filters: FilterOwnerDTO): Promise<Owner[]> {
    return this.ownerRepository.find({
      where: {
        ...filters,
      },
    });
  }

  async findOwnerByID(id: string): Promise<Owner | null> {
    return this.ownerRepository.findOne({ where: { id } });
  }
  async createOwner(body: CreateOwnerDTO): Promise<Owner> {
    const owner = this.ownerRepository.create({ ...body });

    return this.ownerRepository.save(owner);
  }

  async deleteOwner(id: string): Promise<boolean> {
    const result = await this.ownerRepository.softDelete({ id });

    return (result.affected ?? 0) > 0;
  }

  async updateOwner(id: string, body: UpdateOwnerDTO): Promise<Owner | null> {
    const owner = await this.ownerRepository.findOne({ where: { id } });

    if (!owner) {
      return null;
    }

    if (body.name !== undefined) {
      owner.name = body.name;
    }

    return this.ownerRepository.save(owner);
  }
}
