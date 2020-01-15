import { Request, Response, NextFunction } from 'express';
import db from '../db/models';
import { UserRoles } from '../interfaces/UserRoles';

const rbacMiddleware = (roles: UserRoles[]) => async (
  req: Request,
  resp: Response,
  next: NextFunction,
): Promise<Response | void> => {
  if (!req.user) {
    return resp.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const user = await db.User.findByPk(req.user.id);
    if (roles.includes(user?.get('role') as UserRoles)) {
      next();
    }
    return resp.status(401).json({ msg: 'User role not correct' });
  } catch (error) {
    return resp.status(401).json({ msg: 'User not found' });
  }
};

export default rbacMiddleware;
