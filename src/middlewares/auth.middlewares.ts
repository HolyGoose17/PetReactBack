import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { STATUS_CODE } from '../utils/constants';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenJwt = req.headers.authorization;
    if (tokenJwt) {
      jwt.verify(
        tokenJwt.split(' ')[1],
        process.env.SECRET_KEY || 'my_secret_key',
      );
      next();
    } else {
      res.status(STATUS_CODE.NOT_AUTHORIZED).send('Unauthorazion error');
    }
  } catch (error) {
    res.status(STATUS_CODE.FORBIDDEN).send('Forbidden');
  }
};
