import { Request, Response } from 'express';

import { PositionService } from '@/services/position.service';
import { AbstractIdParams, STATUS_CODE } from '@/utils/constants';

export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  getPosition = async (req: Request, res: Response): Promise<void> => {
    const position = await this.positionService.findPosition(req.query);

    res.status(STATUS_CODE.OK).json(position);
  };

  getPositionByID = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const position = await this.positionService.findPositionByID(req.params.id);

    if (!position) {
      res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Position not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(position);
  };

  postPosition = async (req: Request, res: Response): Promise<void> => {
    const position = await this.positionService.createPosition(req.body);

    res.status(STATUS_CODE.CREATED).json(position);
  };

  deletePosition = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const position = await this.positionService.deletePosition(req.params.id);

    if (!position) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Position not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json({ success: true });
  };

  putPosition = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const position = await this.positionService.updatePosition(
      req.params.id,
      req.body,
    );

    if (!position) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Position not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(position);
  };
}
