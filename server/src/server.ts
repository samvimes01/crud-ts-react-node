import App from './app';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';

import loggerMiddleware from './middleware/logger';
import RootController from './controllers/root.controller';
import AuthController from './controllers/api/v1/auth.controller';
import ProfileController from './controllers/api/v1/profile.controller';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const port = +process.env.SERVER_PORT! || 5000;

const app = new App({
  port,
  controllers: [new RootController(), new AuthController(), new ProfileController()],
  middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware],
});

app.listen();
