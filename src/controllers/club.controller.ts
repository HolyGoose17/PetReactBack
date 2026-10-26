import { Request, Response } from 'express';

import { ClubService } from '@/services/club.service';
import { AbstractIdParams, STATUS_CODE } from '@/utils/constants';

export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  getClub = async (req: Request, res: Response): Promise<void> => {
    const club = await this.clubService.findClub(req.query);

    res.status(STATUS_CODE.OK).json(club);
  };

  getClubByID = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const club = await this.clubService.findClubByID(req.params.id);

    if (!club) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Club not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(club);
  };

  postClub = async (req: Request, res: Response): Promise<void> => {
    const club = await this.clubService.createClub(req.body);

    res.status(STATUS_CODE.CREATED).json(club);
  };

  deleteClub = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const club = await this.clubService.deleteClub(req.params.id);

    if (!club) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Club not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json({ success: true });
  };

  putClub = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const club = await this.clubService.updateClub(req.params.id, req.body);

    if (!club) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Club not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(club);
  };
}
