import { Club } from '../entities/club';
import { League } from '../entities/league';
import { Owner } from '../entities/owner';
import { Repository, getRepository } from 'typeorm';

type FilterClubDTO = {
  clubName?: string;
  pathLogo?: string;
  pathLeague?: string;
};

type CreateClubDTO = Omit<
  ClubResponse,
  'clubID' | 'ownerName' | 'leagueName'
> & {
  ownerName: { ownerID: number };
  leagueName: { leagueID: number };
};

type UpdateClubDTO = Partial<
  Omit<ClubResponse, 'clubID' | 'ownerName' | 'leagueName'> & {
    ownerNameOwnerID?: number;
    leagueNameLeagueID?: number;
    pathLogo?: string;
    pathLeague?: string;
  }
>;

export type ClubResponse = {
  clubID: number;
  clubName: string;
  pathLogo: string;
  pathLeague: string;
  ownerName: string | null;
  leagueName: string | null;
};

export class ClubService {
  private clubs: Repository<Club>;

  async allClubs(): Promise<ClubResponse[]> {
    this.clubs = getRepository(Club);
    const clubs = await this.clubs.find({
      relations: { ownerName: true, leagueName: true },
    });

    return clubs.map((c) => {
      console.log('Mapping club:', {
        clubID: c.clubID,
        ownerName: c.ownerName?.ownerName,
        ownerNameID: c.ownerName?.ownerID,
        leagueName: c.leagueName?.leagueName,
        leagueNameID: c.leagueName?.leagueID,
      });
      return {
        clubID: c.clubID,
        clubName: c.clubName,
        pathLogo: c.pathLogo,
        pathLeague: c.pathLeague,
        ownerName: c.ownerName?.ownerName || null,
        leagueName: c.leagueName?.leagueName || null,
      };
    });
  }

  async findClub(filters: FilterClubDTO): Promise<ClubResponse[]> {
    this.clubs = getRepository(Club);
    const clubs = await this.clubs.find({
      where: { ...filters },
      relations: ['ownerName', 'leagueName'],
    });

    return clubs.map((c) => ({
      clubID: c.clubID,
      clubName: c.clubName,
      pathLogo: c.pathLogo,
      pathLeague: c.pathLeague,
      ownerName: c.ownerName?.ownerName || null,
      leagueName: c.leagueName?.leagueName || null,
    }));
  }

  async findClubByID(clubID: number): Promise<ClubResponse | null> {
    this.clubs = getRepository(Club);
    const club = await this.clubs.findOne({
      where: { clubID },
      relations: ['ownerName', 'leagueName'],
    });

    if (!club) return null;

    return {
      clubID: club.clubID,
      clubName: club.clubName,
      pathLogo: club.pathLogo,
      pathLeague: club.pathLeague,
      ownerName: club.ownerName?.ownerName || null,
      leagueName: club.leagueName?.leagueName || null,
    };
  }

  async createClub(body: CreateClubDTO): Promise<Club> {
    this.clubs = getRepository(Club);
    const club = this.clubs.create(body);
    return await this.clubs.save(club);
  }

  async deleteClub(clubID: number): Promise<boolean> {
    this.clubs = getRepository(Club);
    const result = await this.clubs.delete({ clubID });
    return (result.affected ?? 0) > 0;
  }

  async updateClub(id: number, body: UpdateClubDTO): Promise<boolean> {
    this.clubs = getRepository(Club);

    const club = await this.clubs.findOne({
      where: { clubID: id },
      relations: ['ownerName', 'leagueName'],
    });

    if (!club) {
      throw new Error('Club not found');
    }

    club.clubName = body.clubName ?? club.clubName;
    club.pathLogo = body.pathLogo ?? club.pathLogo;
    club.pathLeague = body.pathLeague ?? club.pathLeague;

    if (body.ownerNameOwnerID !== undefined) {
      const ownerRepo = getRepository(Owner);
      const owner = await ownerRepo.findOne({
        where: { ownerID: body.ownerNameOwnerID },
      });
      club.ownerName = owner || null;
    }

    if (body.leagueNameLeagueID !== undefined) {
      const leagueRepo = getRepository(League);
      const league = await leagueRepo.findOne({
        where: { leagueID: body.leagueNameLeagueID },
      });
      club.leagueName = league || null;
    }

    try {
      await this.clubs.save(club);
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      throw error;
    }
  }
}
