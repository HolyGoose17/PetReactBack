import { AppDataSource } from '@/config/data-source';
import { Club } from '@/entities/club.entity';
import { League } from '@/entities/league.entity';
import { Owner } from '@/entities/owner.entity';
import { Repository } from 'typeorm';

type FilterClubDTO = {
  name?: string;
};

type CreateClubDTO = {
  name: string;
  logoPath: string;
  ownerId: string;
  leagueId: string;
};

type UpdateClubDTO = {
  name?: string;
  logoPath?: string;
  ownerId?: string;
  leagueId?: string;
};

export class ClubService {
  private readonly clubRepository: Repository<Club>;
  private readonly ownerRepository: Repository<Owner>;
  private readonly leagueRepository: Repository<League>;

  constructor() {
    this.clubRepository = AppDataSource.getRepository(Club);
    this.ownerRepository = AppDataSource.getRepository(Owner);
    this.leagueRepository = AppDataSource.getRepository(League);
  }

  async findClub(filters: FilterClubDTO): Promise<Club[]> {
    return this.clubRepository.find({
      where: { ...filters },
      relations: ['owner', 'league'],
    });
  }

  async findClubByID(id: string): Promise<Club | null> {
    return this.clubRepository.findOne({
      where: { id },
      relations: ['owner', 'league'],
    });
  }

  async createClub(body: CreateClubDTO): Promise<Club> {
    const owner = await this.ownerRepository.findOne({
      where: { id: body.ownerId },
    });
    if (!owner) {
      throw new Error('Owner not found');
    }

    const league = await this.leagueRepository.findOne({
      where: { id: body.leagueId },
    });
    if (!league) {
      throw new Error('League not found');
    }

    const club = this.clubRepository.create({
      name: body.name,
      logoPath: body.logoPath,
      owner,
      league,
    });
    return this.clubRepository.save(club);
  }

  async updateClub(id: string, body: UpdateClubDTO): Promise<Club | null> {
    const club = await this.clubRepository.findOne({
      where: { id },
      relations: ['owner', 'league'],
    });

    if (!club) {
      return null;
    }

    if (body.name !== undefined) {
      club.name = body.name;
    }

    if (body.logoPath !== undefined) {
      club.logoPath = body.logoPath;
    }

    if (body.ownerId !== undefined) {
      const owner = await this.ownerRepository.findOne({
        where: { id: body.ownerId },
      });

      if (!owner) {
        throw new Error('Owner not found');
      }

      club.owner = owner;
    }

    if (body.leagueId !== undefined) {
      const league = await this.leagueRepository.findOne({
        where: { id: body.leagueId },
      });

      if (!league) {
        throw new Error('League not found');
      }
      club.league = league;
    }

    return this.clubRepository.save(club);
  }

  async deleteClub(id: string): Promise<boolean> {
    const result = await this.clubRepository.softDelete({ id });

    return (result.affected ?? 0) > 0;
  }
}
