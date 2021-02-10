import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import employeeController from '../controllers/employee.controller';

export default class Routes {
  static init(app: express.Application): void {
    const router: express.Router = express.Router();

    // Express middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors());

    app.use('/', router);

    app.get('/hello/:name', (req, res) => {
      res.send(`Hello ${req.params.name}`);
    });

    app.post('/employees/create', employeeController.create);

    app.get('/employees/all', employeeController.all);

    // Static content
    app.use(express.static(path.join(__dirname, '../public')));
  }
}
