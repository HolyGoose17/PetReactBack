import { Request, Response } from 'express';
import { LeagueService } from '@/services/league.service';
import { AbstractIdParams, STATUS_CODE } from '@/utils/constants';

export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  getLeague = async (req: Request, res: Response): Promise<void> => {
    const league = await this.leagueService.findLeague(req.query);

    res.status(STATUS_CODE.OK).json(league);
  };

  getLeagueByID = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const league = await this.leagueService.findLeagueByID(req.params.id);

    if (!league) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'League not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(league);
  };

  postLeague = async (req: Request, res: Response): Promise<void> => {
    const league = await this.leagueService.createLeague(req.body);

    res.status(STATUS_CODE.CREATED).json(league);
  };

  deleteLeague = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const league = await this.leagueService.deleteLeague(req.params.id);

    if (!league) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'League not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json({ success: true });
  };

  putLeague = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const league = await this.leagueService.updateLeague(
      req.params.id,
      req.body,
    );

    if (!league) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'League not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(league);
  };
}
