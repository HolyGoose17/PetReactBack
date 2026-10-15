import { Request, Response } from 'express';
import { OwnerService } from '@/services/owner.service';
import { AbstractIdParams, STATUS_CODE } from '@/utils/constants';

export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  getOwner = async (req: Request, res: Response): Promise<void> => {
    const owner = await this.ownerService.findOwner(req.query);

    res.status(STATUS_CODE.OK).json(owner);
  };

  getOwnerByID = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const owner = await this.ownerService.findOwnerByID(req.params.id);

    if (!owner) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Owner not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(owner);
  };

  postOwner = async (req: Request, res: Response): Promise<void> => {
    const owner = await this.ownerService.createOwner(req.body);

    res.status(STATUS_CODE.CREATED).json(owner);
  };

  deleteOwner = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const owner = await this.ownerService.deleteOwner(req.params.id);

    if (!owner) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Owner not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json({ success: true });
  };

  putOwner = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const owner = await this.ownerService.updateOwner(req.params.id, req.body);

    if (!owner) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Owner not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(owner);
  };
}
