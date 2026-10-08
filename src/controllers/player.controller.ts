import { Request, Response, NextFunction } from 'express';
import { PlayerService } from '@/services/player.service';
import { STATUS_CODE } from '@/utils/constants';

export class PlayerController {
  private playerService: PlayerService;
  constructor(playerService: PlayerService) {
    this.playerService = playerService;
  }

  getPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.playerService.findPlayer(req.query as any);
      res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  getPlayerByID = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await this.playerService.findPlayerByID(id);
      if (!result) {
        res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Player not found' });
      } else {
        res.status(STATUS_CODE.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  postPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {
        playerName,
        playerAge,
        playerNational,
        playerFoot,
        playerSalary,
        roleNameRoleID,
        agentNameAgentID,
        clubNameClubID,
        path,
        pathWork,
      } = req.body;

      if (!path.startsWith('img/')) {
        throw new Error('path must start with img/');
      }
      if (!pathWork.startsWith('img/')) {
        throw new Error('pathWork must start with img/');
      }

      const playerData = {
        playerName,
        playerAge: parseInt(playerAge),
        playerNational,
        playerFoot,
        playerSalary,
        path,
        pathWork,
        roleName: { roleID: parseInt(roleNameRoleID) },
        agentName: { agentID: parseInt(agentNameAgentID) },
        clubName: { clubID: parseInt(clubNameClubID) },
      };

      const result = await this.playerService.createPlayer(playerData);
      res.status(STATUS_CODE.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  deletePlayer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await this.playerService.deletePlayer(id);
      res.status(STATUS_CODE.OK).json({ success: result });
    } catch (error) {
      next(error);
    }
  };

  putPlayer = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        playerName,
        playerAge,
        playerNational,
        playerFoot,
        playerSalary,
        roleNameRoleID,
        agentNameAgentID,
        clubNameClubID,
        path,
        pathWork,
      } = req.body;

      const player = await this.playerService.findPlayerByID(id);
      if (!player) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: 'Player not found' });
      }

      if (path && !path.startsWith('img/')) {
        throw new Error('path must start with img/');
      }
      if (pathWork && !pathWork.startsWith('img/')) {
        throw new Error('pathWork must start with img/');
      }

      const updateData: any = {
        playerName,
        playerAge: parseInt(playerAge),
        playerNational,
        playerFoot,
        playerSalary,
        roleNameRoleID,
        agentNameAgentID,
        clubNameClubID,
      };

      if (path !== undefined) {
        updateData.path = path;
      }
      if (pathWork !== undefined) {
        updateData.pathWork = pathWork;
      }

      const result = await this.playerService.updatePlayer(id, updateData);
      if (result) {
        const updatedPlayer = await this.playerService.findPlayerByID(id);
        res.status(STATUS_CODE.OK).json(updatedPlayer);
      } else {
        res
          .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to update player' });
      }
    } catch (error) {
      next(error);
    }
  };

  fullPlayers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.playerService.allPlayers();
      res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  };
}
