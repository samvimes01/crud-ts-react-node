import express, { Application } from 'express';
import cors from 'cors';
import BasicController from './interfaces/BasicController';
class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: Function[]; controllers: BasicController[] }) {
    this.app = express();
    this.port = appInit.port;
    this.app.use(cors({ origin: 'http://localhost:3000' }));

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }): void {
    middleWares.forEach(middleWare => this.app.use(middleWare));
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }): void {
    controllers.forEach(controller => this.app.use('/', controller.router));
  }

  public listen(): void {
    this.app.listen(this.port, () => console.log(`App listening on the ${this.port}`));
  }
}

export default App;
