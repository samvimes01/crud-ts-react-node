import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import BasicController from '../../../interfaces/BasicController';
import db from '../../../db/models';
import auth from '../../../middleware/auth';
import rbac from '../../../middleware/rbac';
import { UserRoles } from '../../../interfaces/UserRoles';

dotenv.config();

class ProfileController implements BasicController {
  public path = '/api/v1/user';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(`${this.path}/me`, auth, this.getMyProfile);
    // this.router.post(`${this.path}/me`, auth, this.updateMyProfile);
    this.router.get(`${this.path}/profiles`, [auth, rbac([UserRoles.ADMIN])], this.getProfiles);
  }

  getMyProfile = async (req: Request, res: Response): Promise<Response | void> => {
    const { id } = req.user;

    try {
      const profile = await db.UserProfile.findByPk(id);
      if (!profile) {
        return res.status(204).json({ msg: 'User profie does not exists' });
      }

      res.json({ profile: profile.toJSON() });
    } catch (error) {
      res.status(500).send('Server error');
    }
  };

  getProfiles = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      res.status(200).send('Not implemented');
    } catch (error) {
      res.status(500).send('Server error');
    }
  };
}

export default ProfileController;
