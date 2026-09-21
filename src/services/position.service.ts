import { AppDataSource } from '../config/data-source';
import { Position } from '../entities/position';
import { Repository } from 'typeorm';

export type PositionDTO = {
  name?: string;
};

export class PositionService {
  private positionRepository: Repository<Position>;
  constructor() {
    this.positionRepository = AppDataSource.getRepository(Position);
  }

  async allPositions(): Promise<Position[]> {
    return await this.positionRepository.find();
  }

  async findPosition(filters: PositionDTO): Promise<Position[]> {
    return await this.positionRepository.find({
      where: filters,
    });
  }

  async findPositionByID(id: number): Promise<Position | null> {
    return await this.positionRepository.findOne({ where: { id } });
  }

  async createPosition(body: PositionDTO): Promise<Position> {
    const position = this.positionRepository.create(body);
    return await this.positionRepository.save(position);
  }

  async deletePosition(id: number): Promise<boolean> {
    const result = await this.positionRepository.delete({ id: id });
    return (result.affected ?? 0) > 0;
  }

  async updatePosition(id: number, body: PositionDTO): Promise<boolean> {
    const result = await this.positionRepository.update(id, { ...body });
    return (result.affected ?? 0) > 0;
  }
}
