import { Request, Response, NextFunction } from 'express';

import { STATUS_CODE } from '@/utils/constants';

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const message =
    error instanceof Error ? error.message : 'Internal Server Error';
  res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: message });
};
