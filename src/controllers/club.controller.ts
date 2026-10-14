import { AbstractIdParams, STATUS_CODE } from '@/utils/constants';
import { ClubService } from '@/services/club.service';
import { Request, Response } from 'express';

export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  getClub = async (req: Request, res: Response): Promise<void> => {
    const result = await this.clubService.findClub(req.query);

    res.status(STATUS_CODE.OK).send(result);
  };

  getClubByID = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const result = await this.clubService.findClubByID(req.params.id);

    if (!result) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Club not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(result);
  };

  postClub = async (req: Request, res: Response): Promise<void> => {
    const result = await this.clubService.createClub(req.body);

    res.status(STATUS_CODE.CREATED).json(result);
  };

  deleteClub = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const result = await this.clubService.deleteClub(req.params.id);

    if (!result) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Club not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json({ success: true });
  };

  putClub = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const result = await this.clubService.updateClub(req.params.id, req.body);

    if (!result) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Club not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(result);
  };
}
