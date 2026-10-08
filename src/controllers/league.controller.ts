import { Request, Response, NextFunction } from 'express';
import { LeagueService } from '@/services/league.service';
import { STATUS_CODE } from '@/utils/constants';

export class LeagueController {
  private leagueService: LeagueService;
  constructor(leagueService: LeagueService) {
    this.leagueService = leagueService;
  }

  getLeague = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.leagueService.findLeague(req.query);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  getLeagueByID = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.leagueService.findLeagueByID(req.params.id);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  postLeague = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.leagueService.createLeague(req.body);
      res.status(STATUS_CODE.CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };

  deleteLeague = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.leagueService.deleteLeague(req.params.id);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  putLeague = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.leagueService.updateLeague(
        req.params.id,
        req.body,
      );
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  fullLeagues = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.leagueService.allLeagues();
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };
}
