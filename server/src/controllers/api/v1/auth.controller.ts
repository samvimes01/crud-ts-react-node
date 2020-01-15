import express, { Request, Response } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import BasicController from '../../../interfaces/BasicController';
import db from '../../../db/models';
import { UserRoles } from '../../../interfaces/UserRoles';

dotenv.config();

class AuthController implements BasicController {
  public path = '/api/v1/auth';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(`${this.path}/signin`, this.requestValidators(), this.signIn);
    this.router.post(`${this.path}/signup`, this.requestValidators(), this.signUp);
  }

  private requestValidators(): ValidationChain[] {
    return [
      check('email', 'Please, provide a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ];
  }

  signIn = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.get('password') as string);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const userId = user.get('id') as number;
      const userRole = user.get('role') as UserRoles;
      this.sendJwtToken(res, userId, userRole);
    } catch (error) {
      res.status(500).send('Server error');
    }
  };

  signUp = async (req: Request, res: Response): Promise<Response | void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await db.User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT!);
      const passwordHash = await bcrypt.hash(password, salt);

      user = await db.User.create({ email, password: passwordHash });
      await db.UserProfile.create({ userId: user.get('id') });

      const userId = user.get('id') as number;
      const userRole = user.get('role') as UserRoles;
      this.sendJwtToken(res, userId, userRole);
    } catch (error) {
      res.status(500).send('Server error');
    }
  };

  sendJwtToken(res: Response, id: number, role: UserRoles): void {
    const payload = { user: { id, role } };
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRE! }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  }
}

export default AuthController;
