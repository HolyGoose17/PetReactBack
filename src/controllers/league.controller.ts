import { Request, Response, NextFunction } from 'express';
import { LeagueService } from '@/services/league.service';
import { AbstractIdParams, STATUS_CODE } from '@/utils/constants';

export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  getLeague = async (req: Request, res: Response): Promise<void> => {
    const result = await this.leagueService.findLeague(req.query);

    res.status(STATUS_CODE.OK).send(result);
  };

  getLeagueByID = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const result = await this.leagueService.findLeagueByID(req.params.id);

    if (!result) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'League not found' });
      return;
    }

    res.status(STATUS_CODE.OK).send(result);
  };

  postLeague = async (req: Request, res: Response): Promise<void> => {
    const result = await this.leagueService.createLeague(req.body);
    res.status(STATUS_CODE.CREATED).send(result);
  };

  deleteLeague = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const result = await this.leagueService.deleteLeague(req.params.id);

    if (!result) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'League not found' });
      return;
    }

    res.status(STATUS_CODE.OK).send(result);
  };

  putLeague = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const result = await this.leagueService.updateLeague(
      req.params.id,
      req.body,
    );

    if (!result) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'League not found' });
      return;
    }

    res.status(STATUS_CODE.OK).send(result);
  };
}
