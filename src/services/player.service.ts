import { Agent } from '../entities/agent';
import { Club } from '../entities/club';
import { Player } from '../entities/player';
import { Role } from '../entities/position';
import { Repository, getRepository } from 'typeorm';

type FilterPlayerDTO = {
  playerName?: string;
  playerAge?: number;
  playerNational?: string;
  playerFoot?: string;
  playerSalary?: string;
  path?: string;
  pathWork?: string;
};

type CreatePlayerDTO = Omit<
  PlayerResponse,
  'playerID' | 'clubName' | 'agentName' | 'roleName'
> & {
  roleName: { roleID: number };
  agentName: { agentID: number };
  clubName: { clubID: number };
};

type UpdatePlayerDTO = Partial<
  Omit<PlayerResponse, 'playerID' | 'clubName' | 'agentName' | 'roleName'> & {
    roleNameRoleID?: number;
    agentNameAgentID?: number;
    clubNameClubID?: number;
    path?: string;
    pathWork?: string;
  }
>;

export type PlayerResponse = {
  playerID: number;
  playerName: string;
  playerAge: number;
  playerNational: string;
  playerFoot: string;
  playerSalary: string;
  path: string;
  pathWork: string;
  clubName: string | null;
  agentName: string | null;
  roleName: string | null;
};

export class PlayerService {
  private players: Repository<Player>;

  async allPlayers(): Promise<PlayerResponse[]> {
    this.players = getRepository(Player);
    const players = await this.players.find({
      relations: { clubName: true, agentName: true, roleName: true },
    });

    return players.map((p) => {
      console.log('Mapping player:', {
        playerID: p.playerID,
        roleName: p.roleName?.roleName,
        roleNameID: p.roleName?.roleID,
        agentName: p.agentName?.agentName,
        agentNameID: p.agentName?.agentID,
        clubName: p.clubName?.clubName,
        clubNameID: p.clubName?.clubID,
      });
      return {
        playerID: p.playerID,
        playerName: p.playerName,
        playerAge: p.playerAge,
        playerNational: p.playerNational,
        playerFoot: p.playerFoot,
        playerSalary: p.playerSalary,
        path: p.path,
        pathWork: p.pathWork,
        clubName: p.clubName?.clubName || null,
        agentName: p.agentName?.agentName || null,
        roleName: p.roleName?.roleName || null,
      };
    });
  }

  async findPlayer(filters: FilterPlayerDTO): Promise<PlayerResponse[]> {
    this.players = getRepository(Player);
    const players = await this.players.find({
      where: { ...filters },
      relations: ['clubName', 'agentName', 'roleName'],
    });

    return players.map((p) => ({
      playerID: p.playerID,
      playerName: p.playerName,
      playerAge: p.playerAge,
      playerNational: p.playerNational,
      playerFoot: p.playerFoot,
      playerSalary: p.playerSalary,
      path: p.path,
      pathWork: p.pathWork,
      clubName: p.clubName?.clubName || null,
      agentName: p.agentName?.agentName || null,
      roleName: p.roleName?.roleName || null,
    }));
  }

  async findPlayerByID(playerID: number): Promise<PlayerResponse | null> {
    this.players = getRepository(Player);
    const player = await this.players.findOne({
      where: { playerID },
      relations: ['clubName', 'agentName', 'roleName'],
    });

    if (!player) return null;

    return {
      playerID: player.playerID,
      playerName: player.playerName,
      playerAge: player.playerAge,
      playerNational: player.playerNational,
      playerFoot: player.playerFoot,
      playerSalary: player.playerSalary,
      path: player.path,
      pathWork: player.pathWork,
      clubName: player.clubName?.clubName || null,
      agentName: player.agentName?.agentName || null,
      roleName: player.roleName?.roleName || null,
    };
  }

  async createPlayer(body: CreatePlayerDTO): Promise<Player> {
    this.players = getRepository(Player);
    const player = this.players.create(body);
    return await this.players.save(player);
  }

  async deletePlayer(playerID: number): Promise<boolean> {
    this.players = getRepository(Player);
    const result = await this.players.delete({ playerID });
    return (result.affected ?? 0) > 0;
  }

  async updatePlayer(id: number, body: UpdatePlayerDTO): Promise<boolean> {
    this.players = getRepository(Player);

    const player = await this.players.findOne({
      where: { playerID: id },
      relations: ['roleName', 'agentName', 'clubName'],
    });

    if (!player) {
      throw new Error('Player not found');
    }

    player.playerName = body.playerName ?? player.playerName;
    player.playerAge = body.playerAge ?? player.playerAge;
    player.playerNational = body.playerNational ?? player.playerNational;
    player.playerFoot = body.playerFoot ?? player.playerFoot;
    player.playerSalary = body.playerSalary ?? player.playerSalary;
    player.path = body.path ?? player.path;
    player.pathWork = body.pathWork ?? player.pathWork;

    if (body.roleNameRoleID !== undefined) {
      const roleRepo = getRepository(Role);
      const role = await roleRepo.findOne({
        where: { roleID: body.roleNameRoleID },
      });
      player.roleName = role || null;
    }

    if (body.agentNameAgentID !== undefined) {
      const agentRepo = getRepository(Agent);
      const agent = await agentRepo.findOne({
        where: { agentID: body.agentNameAgentID },
      });
      player.agentName = agent || null;
    }

    if (body.clubNameClubID !== undefined) {
      const clubRepo = getRepository(Club);
      const club = await clubRepo.findOne({
        where: { clubID: body.clubNameClubID },
      });
      player.clubName = club || null;
    }

    try {
      await this.players.save(player);
      return true;
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      throw error;
    }
  }
}
