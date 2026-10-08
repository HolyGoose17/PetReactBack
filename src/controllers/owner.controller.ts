import { NextFunction, Request, Response } from 'express';
import { OwnerService } from '@/services/owner.service';
import { STATUS_CODE } from '@/utils/constants';

export class OwnerController {
  private ownerService: OwnerService;
  constructor(ownerService: OwnerService) {
    this.ownerService = ownerService;
  }

  getOwner = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.ownerService.findOwner(req.query);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  getOwnerByID = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.ownerService.findOwnerByID(req.params.id);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  postOwner = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.ownerService.createOwner(req.body);
      res.status(STATUS_CODE.CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };

  deleteOwner = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.ownerService.deleteOwner(req.params.id);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  putOwner = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.ownerService.updateOwner(
        req.params.id,
        req.body,
      );
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  fullOwners = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.ownerService.allOwners();
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };
}
