import { League } from '../entities/league';
import { Repository, getRepository } from 'typeorm';

type FilterLeagueDTO = {
  leagueName?: string;
};
type CreateLeagueDTO = {
  leagueName?: string;
};
type UpdateLeagueDTO = {
  leagueName?: string;
};

export class LeagueService {
  private leagues: Repository<League>;

  async allLeagues(): Promise<League> {
    this.leagues = getRepository(League);
    return await this.leagues.query('Select * from League');
  }

  async findLeague(filters: FilterLeagueDTO): Promise<League[]> {
    this.leagues = getRepository(League);
    return await this.leagues.find({
      where: {
        ...filters,
      },
    });
  }

  async findLeagueByID(leagueID: number): Promise<League> {
    this.leagues = getRepository(League);
    return await this.leagues.findOne({ where: { leagueID } });
  }
  async createLeague(body: CreateLeagueDTO): Promise<League> {
    this.leagues = getRepository(League);
    return await this.leagues.save({ ...body });
  }

  async deleteLeague(leagueID: number): Promise<boolean> {
    this.leagues = getRepository(League);
    const result = await this.leagues.delete({ leagueID });
    return (result.affected ?? 0) > 0;
  }

  async updateLeague(id: number, body: UpdateLeagueDTO): Promise<any> {
    this.leagues = getRepository(League);
    const result = await this.leagues.update(id, { ...body });
    return result ? true : false;
  }
}
