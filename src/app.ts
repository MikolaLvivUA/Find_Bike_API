import { NextFunction, Request, Response } from 'express';

/*import * as cors from 'cors';*/  //TODO
import * as express from 'express';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
/*import * as mongoose from 'mongoose';*/ //TODO
import * as path from 'path';

import { config } from './config';

dotenv.config();

const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests
});

class App {
    public readonly app: express.Application = express();

    constructor() {
      (global as any).appRoot = path.resolve(process.cwd(), '../');

      this.app.use(morgan('dev'));
      this.app.use(helmet());
      this.app.use(serverRequestLimit);

      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: true}));

      this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));

      this.app.use(this.customErrorHandler);

    }

    private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
      res
        .status(err.status || 500)
        .json({
          message: err.message || 'Unknown Error',
          code: err.code
        });
    }
}

export const app = new App().app;
