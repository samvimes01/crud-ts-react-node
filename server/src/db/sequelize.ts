/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = process.env.DB_NAME!;
const username = process.env.DB_USERNAME!;
const password = process.env.DB_PASSWORD;
const port = +process.env.DB_PORT!;
const host = process.env.DB_HOSTNAME!;

const sequelize = new Sequelize(db, username, password, {
  host,
  dialect: 'mysql',
  port,
});

export default sequelize;
