import { STATUS_CODE } from '@/utils/constants';
import { ClubService } from '@/services/club.service';
import { Request, Response, NextFunction } from 'express';

export class ClubController {
  private clubService: ClubService;
  constructor(clubService: ClubService) {
    this.clubService = clubService;
  }

  getClub = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.clubService.findClub(req.query as any);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  getClubByID = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await this.clubService.findClubByID(id);
      if (!result) {
        res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Club not found' });
      } else {
        res.status(STATUS_CODE.OK).json(result);
      }
    } catch (error) {
      next(error);
    }
  };

  postClub = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {
        clubName,
        ownerNameOwnerID,
        leagueNameLeagueID,
        pathLogo,
        pathLeague,
      } = req.body;

      if (!pathLogo.startsWith('img/')) {
        throw new Error('pathLogo must start with img/');
      }
      if (!pathLeague.startsWith('img/')) {
        throw new Error('pathLeague must start with img/');
      }

      const clubData = {
        clubName,
        pathLogo,
        pathLeague,
        ownerName: { ownerID: parseInt(ownerNameOwnerID) },
        leagueName: { leagueID: parseInt(leagueNameLeagueID) },
      };

      const result = await this.clubService.createClub(clubData);
      res.status(STATUS_CODE.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  deleteClub = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await this.clubService.deleteClub(id);
      res.status(STATUS_CODE.OK).json({ success: result });
    } catch (error) {
      next(error);
    }
  };

  putClub = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        clubName,
        ownerNameOwnerID,
        leagueNameLeagueID,
        pathLogo,
        pathLeague,
      } = req.body;

      const club = await this.clubService.findClubByID(id);
      if (!club) {
        return res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ error: 'Club not found' });
      }

      if (pathLogo && !pathLogo.startsWith('img/')) {
        throw new Error('pathLogo must start with img/');
      }
      if (pathLeague && !pathLeague.startsWith('img/')) {
        throw new Error('pathLeague must start with img/');
      }

      const updateData: any = {
        clubName,
        ownerNameOwnerID,
        leagueNameLeagueID,
      };

      if (pathLogo !== undefined) {
        updateData.pathLogo = pathLogo;
      }
      if (pathLeague !== undefined) {
        updateData.pathLeague = pathLeague;
      }

      const result = await this.clubService.updateClub(id, updateData);
      if (result) {
        const updatedClub = await this.clubService.findClubByID(id);
        res.status(STATUS_CODE.OK).json(updatedClub);
      } else {
        res
          .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to update club' });
      }
    } catch (error) {
      next(error);
    }
  };

  fullClubs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.clubService.allClubs();
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };
}
