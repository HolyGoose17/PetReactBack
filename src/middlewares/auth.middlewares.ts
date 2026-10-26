import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import { UserRole } from '@/entities/user.entity';
import { STATUS_CODE } from '@/utils/constants';

export type AuthenticatedUser = {
  id: string;
  login: string;
  role: UserRole;
};

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedUser;
  }
}

function isAuthenticatedUser(payload: unknown): payload is AuthenticatedUser {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  const claims = payload as Record<string, unknown>;
  return (
    typeof claims.id === 'string' &&
    typeof claims.login === 'string' &&
    (claims.role === UserRole.USER || claims.role === UserRole.ADMIN)
  );
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorization = req.get('authorization');
  const bearerMatch = authorization?.match(/^Bearer\s+(\S+)$/i);
  if (!bearerMatch) {
    res.status(STATUS_CODE.NOT_AUTHORIZED).json({ message: 'Unauthorized' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    next(new Error('JWT_SECRET is not configured'));
    return;
  }

  try {
    const payload: unknown = jwt.verify(bearerMatch[1], secret);
    if (!isAuthenticatedUser(payload)) {
      res.status(STATUS_CODE.FORBIDDEN).json({ message: 'Invalid token' });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(STATUS_CODE.FORBIDDEN).json({ message: 'Invalid token' });
      return;
    }
    next(error);
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    res.status(STATUS_CODE.NOT_AUTHORIZED).json({ message: 'Unauthorized' });
    return;
  }

  // A valid token proves identity, not permission to read or mutate all user accounts.
  if (req.user.role !== UserRole.ADMIN) {
    res
      .status(STATUS_CODE.FORBIDDEN)
      .json({ message: 'Admin access required' });
    return;
  }

  next();
};
