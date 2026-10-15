import { AppDataSource } from '@/config/data-source';
import { League } from '@/entities/league.entity';
import { Repository } from 'typeorm';

type FilterLeagueDTO = {
  name?: string;
};
type CreateLeagueDTO = {
  name: string;
  logoPath: string;
};
type UpdateLeagueDTO = {
  name?: string;
  logoPath?: string;
};

export class LeagueService {
  private readonly leagueRepository: Repository<League>;
  constructor() {
    this.leagueRepository = AppDataSource.getRepository(League);
  }

  async findLeague(filters: FilterLeagueDTO): Promise<League[]> {
    return this.leagueRepository.find({
      where: {
        ...filters,
      },
    });
  }

  async findLeagueByID(id: string): Promise<League | null> {
    return this.leagueRepository.findOne({ where: { id } });
  }

  async createLeague(body: CreateLeagueDTO): Promise<League> {
    const league = this.leagueRepository.create(body);
    return this.leagueRepository.save(league);
  }

  async updateLeague(
    id: string,
    body: UpdateLeagueDTO,
  ): Promise<League | null> {
    const league = await this.leagueRepository.findOne({ where: { id } });

    if (!league) {
      return null;
    }

    if (body.name !== undefined) {
      league.name = body.name;
    }

    if (body.logoPath !== undefined) {
      league.logoPath = body.logoPath;
    }

    return this.leagueRepository.save(league);
  }

  async deleteLeague(id: string): Promise<boolean> {
    const result = await this.leagueRepository.softDelete({ id });
    return (result.affected ?? 0) > 0;
  }
}
