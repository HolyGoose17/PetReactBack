import { Repository } from 'typeorm';

import { AppDataSource } from '@/config/data-source';
import { Position } from '@/entities/position.entity';

type PositionDTO = {
  name: string;
};

type OptionalPositionDTO = {
  name?: string;
};

export class PositionService {
  private readonly positionRepository: Repository<Position>;

  constructor() {
    this.positionRepository = AppDataSource.getRepository(Position);
  }

  async findPosition(filters: OptionalPositionDTO): Promise<Position[]> {
    return this.positionRepository.find({
      where: filters,
    });
  }

  async findPositionByID(id: string): Promise<Position | null> {
    return this.positionRepository.findOne({ where: { id } });
  }

  async createPosition(body: PositionDTO): Promise<Position> {
    const position = this.positionRepository.create(body);

    return await this.positionRepository.save(position);
  }

  async deletePosition(id: string): Promise<boolean> {
    const result = await this.positionRepository.softDelete({ id });

    return (result.affected ?? 0) > 0;
  }

  async updatePosition(
    id: string,
    body: PositionDTO,
  ): Promise<Position | null> {
    const position = await this.positionRepository.findOne({
      where: { id },
    });

    if (!position) {
      return null;
    }

    if (body.name !== undefined) {
      position.name = body.name;
    }

    return this.positionRepository.save(position);
  }
}
