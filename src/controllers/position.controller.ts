import { Request, Response, NextFunction } from 'express';
import { PositionService } from '../services/position.service';

export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  async getPosition(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.positionService.findPosition(req.query);
      res.status(200).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getPositionByID(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.positionService.findPositionByID(id);

      if (!result) {
        res.status(404).json({ message: 'Position not found' });
        return;
      }

      res.status(200).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async postPosition(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.positionService.createPosition(req.body);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async deletePosition(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.positionService.deletePosition(id);
      res.status(200).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async putPosition(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const result = await this.positionService.updatePosition(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async allPositions(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.positionService.allPositions();
      res.status(200).json(result);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): void {
    const message =
      error instanceof Error ? error.message : 'Internal Server Error';
    res.status(500).json({ error: message });
  }
}
