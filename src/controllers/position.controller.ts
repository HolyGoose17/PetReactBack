import { NextFunction, Request, Response } from 'express';
import { PositionService } from '@/services/position.service';
import { STATUS_CODE } from '@/utils/constants';

export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  getPosition = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.positionService.findPosition(req.query);
      res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  getPositionByID = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const result = await this.positionService.findPositionByID(id);

      if (!result) {
        res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ message: 'Position not found' });
        return;
      }

      res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  postPosition = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.positionService.createPosition(req.body);
      res.status(STATUS_CODE.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  deletePosition = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const result = await this.positionService.deletePosition(id);
      res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  putPosition = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const result = await this.positionService.updatePosition(id, req.body);
      res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  allPositions = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.positionService.allPositions();
      res.status(STATUS_CODE.OK).json(result);
    } catch (error) {
      next(error);
    }
  };
}
