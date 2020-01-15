import express, { Request, Response } from 'express';
import BasicController from '../interfaces/BasicController';

class RootController implements BasicController {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(this.path, this.info);
  }

  info = (req: Request, res: Response): void => {
    res.status(200).send('you are not authorized');
  };
}

export default RootController;
