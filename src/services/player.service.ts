import { AppDataSource } from '@/config/data-source';
import { Agent } from '@/entities/agent.entity';
import { Club } from '@/entities/club.entity';
import {
  Player,
  PreferredFoot,
  SalaryCurrency,
} from '@/entities/player.entity';
import { Position } from '@/entities/position.entity';
import { Repository } from 'typeorm';

type FilterPlayerDTO = {
  name?: string;
  dateOfBirth?: Date;
  nationality?: string;
  preferredFoot?: PreferredFoot;
  salary?: number;
  salaryCurrency?: SalaryCurrency;
  agent_id?: string;
  club_id?: string;
  positionId?: string;
  photoPath?: string;
};

type CreatePlayerDTO = {
  name: string;
  dateOfBirth: Date;
  nationality: string;
  preferredFoot: PreferredFoot;
  salary: number;
  salaryCurrency: SalaryCurrency;
  agent_id?: string;
  club_id?: string;
  positionId: string;
  photoPath: string;
};

type UpdatePlayerDTO = {
  name?: string;
  dateOfBirth?: Date;
  nationality?: string;
  preferredFoot?: PreferredFoot;
  salary?: number;
  salaryCurrency?: SalaryCurrency;
  agent_id?: string;
  club_id?: string;
  positionId?: string;
  photoPath?: string;
};

export class PlayerService {
  private readonly playerRepository: Repository<Player>;
  private readonly agentRepository: Repository<Agent>;
  private readonly clubRepository: Repository<Club>;
  private readonly positionRepository: Repository<Position>;

  constructor() {
    this.playerRepository = AppDataSource.getRepository(Player);
    this.agentRepository = AppDataSource.getRepository(Agent);
    this.clubRepository = AppDataSource.getRepository(Club);
    this.positionRepository = AppDataSource.getRepository(Position);
  }

  async findPlayer(filters: FilterPlayerDTO): Promise<Player[]> {
    const { agent_id, club_id, positionId, ...playerFilters } = filters;

    return this.playerRepository.find({
      where: {
        ...playerFilters,
        ...(agent_id !== undefined ? { agent: { id: agent_id } } : {}),
        ...(club_id !== undefined ? { club: { id: club_id } } : {}),
        ...(positionId !== undefined
          ? { position: { id: positionId } }
          : {}),
      },
      relations: ['agent', 'club', 'position'],
    });
  }

  async findPlayerByID(id: string): Promise<Player | null> {
    return this.playerRepository.findOne({
      where: { id },
      relations: ['agent', 'club', 'position'],
    });
  }

  async createPlayer(body: CreatePlayerDTO): Promise<Player> {
    const agent =
      body.agent_id === undefined
        ? null
        : await this.agentRepository.findOne({
            where: { id: body.agent_id },
          });
    if (body.agent_id !== undefined && !agent) {
      throw new Error('Agent not found');
    }

    const club =
      body.club_id === undefined
        ? null
        : await this.clubRepository.findOne({
            where: { id: body.club_id },
          });
    if (body.club_id !== undefined && !club) {
      throw new Error('Club not found');
    }

    const position = await this.positionRepository.findOne({
      where: { id: body.positionId },
    });
    if (!position) {
      throw new Error('Position not found');
    }

    const player = this.playerRepository.create({
      name: body.name,
      dateOfBirth: body.dateOfBirth,
      nationality: body.nationality,
      preferredFoot: body.preferredFoot,
      salary: body.salary,
      salaryCurrency: body.salaryCurrency,
      photoPath: body.photoPath,
      agent,
      club,
      position,
    });

    return this.playerRepository.save(player);
  }

  async deletePlayer(id: string): Promise<boolean> {
    const result = await this.playerRepository.softDelete({ id });

    return (result.affected ?? 0) > 0;
  }

  async updatePlayer(
    id: string,
    body: UpdatePlayerDTO,
  ): Promise<Player | null> {
    const player = await this.playerRepository.findOne({
      where: { id },
      relations: ['agent', 'club', 'position'],
    });

    if (!player) {
      return null;
    }

    if (body.name !== undefined) {
      player.name = body.name;
    }

    if (body.dateOfBirth !== undefined) {
      player.dateOfBirth = body.dateOfBirth;
    }

    if (body.nationality !== undefined) {
      player.nationality = body.nationality;
    }

    if (body.preferredFoot !== undefined) {
      player.preferredFoot = body.preferredFoot;
    }

    if (body.salary !== undefined) {
      player.salary = body.salary;
    }

    if (body.salaryCurrency !== undefined) {
      player.salaryCurrency = body.salaryCurrency;
    }

    if (body.photoPath !== undefined) {
      player.photoPath = body.photoPath;
    }

    if (body.agent_id !== undefined) {
      const agent = await this.agentRepository.findOne({
        where: { id: body.agent_id },
      });

      if (!agent) {
        throw new Error('Agent not found');
      }
      player.agent = agent;
    }

    if (body.club_id !== undefined) {
      const club = await this.clubRepository.findOne({
        where: { id: body.club_id },
      });

      if (!club) {
        throw new Error('Club not found');
      }
      player.club = club;
    }

    if (body.positionId !== undefined) {
      const position = await this.positionRepository.findOne({
        where: { id: body.positionId },
      });

      if (!position) {
        throw new Error('Position not found');
      }
      player.position = position;
    }

    return this.playerRepository.save(player);
  }
}
