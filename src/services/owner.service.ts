import { Repository } from 'typeorm';

import { AppDataSource } from '@/config/data-source';
import { Owner } from '@/entities/owner.entity';

type OwnerDTO = {
  name: string;
};
type OptionalOwnerDTO = {
  name?: string;
};

export class OwnerService {
  private readonly ownerRepository: Repository<Owner>;

  constructor() {
    this.ownerRepository = AppDataSource.getRepository(Owner);
  }

  async findOwner(filters: OptionalOwnerDTO): Promise<Owner[]> {
    return this.ownerRepository.find({
      where: filters,
    });
  }

  async findOwnerByID(id: string): Promise<Owner | null> {
    return this.ownerRepository.findOne({ where: { id } });
  }
  async createOwner(body: OwnerDTO): Promise<Owner> {
    const owner = this.ownerRepository.create({ ...body });

    return this.ownerRepository.save(owner);
  }

  async deleteOwner(id: string): Promise<boolean> {
    const result = await this.ownerRepository.softDelete({ id });

    return (result.affected ?? 0) > 0;
  }

  async updateOwner(id: string, body: OwnerDTO): Promise<Owner | null> {
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
