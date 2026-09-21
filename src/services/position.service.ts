import { Position } from '../entities/position';
import { Repository, getRepository } from 'typeorm';

type PositionDTO = {
  PositionName?: string;
};

export class PositionService {
  private positions: Repository<Position>;

  async allPositions(): Promise<Position> {
    this.positions = getRepository(Position);
    return await this.positions.query('Select * from Position');
  }

  async findPosition(filters: PositionDTO): Promise<Position[]> {
    this.positions = getRepository(Position);
    return await this.positions.find({
      where: {
        ...filters,
      },
    });
  }

  async findPositionByID(id: number): Promise<Position | null> {
    this.positions = getRepository(Position);
    return await this.positions.findOne({ where: { id } });
  }
  async createPosition(body: PositionDTO): Promise<Position> {
    this.positions = getRepository(Position);
    return await this.positions.save({ ...body });
  }

  async deletePosition(id: number): Promise<boolean> {
    this.positions = getRepository(Position);
    const result = await this.positions.delete({ id: id });
    return (result.affected ?? 0) > 0;
  }

  async updatePosition(id: number, body: PositionDTO): Promise<any> {
    this.positions = getRepository(Position);
    const result = await this.positions.update(id, { ...body });
    return result ? true : false;
  }
}
