import * as dotenv from 'dotenv';
dotenv.config();

import * as http from 'http';
import express, { Application } from 'express';

import routes from './routes';
import db from './db';

const port: number = parseInt(process.env.SERVER_PORT || '5000', 10);

const app: Application = express();

const server: http.Server = http.createServer(app);

routes.init(app);

server.listen(port, async() => {
  await db();

  console.log(`Server started on port : ${port}`);
});
