import App from './app';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';

import loggerMiddleware from './middleware/logger';
import RootController from './controllers/root.controller';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const port = +process.env.SERVER_PORT! || 5000;

const app = new App({
  port,
  controllers: [new RootController()],
  middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware],
});

app.listen();
