import { STATUS_CODE } from '@/utils/constants';
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const message =
    error instanceof Error ? error.message : 'Internal Server Error';
  res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: message });
};
