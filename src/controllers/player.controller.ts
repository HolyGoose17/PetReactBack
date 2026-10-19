import { Request, Response, NextFunction } from 'express';
import { PlayerService } from '@/services/player.service';
import { AbstractIdParams, STATUS_CODE } from '@/utils/constants';

export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  getPlayer = async (req: Request, res: Response): Promise<void> => {
    const player = await this.playerService.findPlayer(req.query);

    res.status(STATUS_CODE.OK).json(player);
  };

  getPlayerByID = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const player = await this.playerService.findPlayerByID(req.params.id);

    if (!player) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Player not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(player);
  };

  postPlayer = async (req: Request, res: Response): Promise<void> => {
    const player = await this.playerService.createPlayer(req.body);

    res.status(STATUS_CODE.CREATED).json(player);
  };

  deletePlayer = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const player = await this.playerService.deletePlayer(req.params.id);

    if (!player) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Player not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json({ success: true });
  };

  putPlayer = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const player = await this.playerService.updatePlayer(
      req.params.id,
      req.body,
    );

    if (!player) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Player not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(player);
  };
}
