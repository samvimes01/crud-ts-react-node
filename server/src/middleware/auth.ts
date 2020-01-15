import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserAttributes } from '../interfaces/User';

dotenv.config();

const authMiddleware = (req: Request, resp: Response, next: NextFunction): Response | void => {
  const token = req.header('x-auth-token');

  if (!token) {
    return resp.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user: UserAttributes };

    req.user = decoded.user;
    next();
  } catch (error) {
    return resp.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
