import * as cors from 'cors';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import { OpenApiValidator } from 'express-openapi-validator';

import logger from './helpers/logger';
import { config } from './config';
import { apiRouter, notFoundRouter } from './routes';

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
        this.app.use(cors({
            origin: this.corsConfiguration
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));

        this.setupDB();

        new OpenApiValidator({
            apiSpec: (path.resolve(process.cwd(), 'documentation', 'openapi.yml')),
            validateRequests: true,
            validateResponses: true
        })
            .install(this.app)
            .then(() => {
                this.mountRoutes();
                this.app.use(this.customErrorHandler);

            });
        this.app.use(this.customErrorHandler);
        this.app.use(this.loggerFunction);
    }

    private setupDB(): void {
        mongoose.connect(config.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false});

        const db = mongoose.connection;
        db.on('error', console.log.bind(console, 'MONGO ERROR'));
    }

    private corsConfiguration = (origin: any, callback: any) => {
        const whiteList = config.ALLOWED_ORIGIN.split(';');

        if (!origin) {
            return callback(null, true);
        }

        if (!whiteList.includes(origin)) {
            return callback(new Error('Cors not allowed'), false);
        }

        return callback(null, true);
    }

    private mountRoutes(): void {
        this.app.use('/api', apiRouter);
        this.app.use('*', notFoundRouter);

    }

    private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
        res
            .status(err.status || 500)
            .json({
                message: err.message || 'unknown error',
                errors: err.errors,
                status: err.status
            });
        logger.log({
            message: err.message,
            level: 'error',
            response: err, status: 500
        });
    }

    private loggerFunction(req: Request, res: Response, next: NextFunction) {
        logger.log({
            message: 'Request received', level: 'info',
            method: req.method,
            url: req.path,
            data: req.body
        });
        next();
    }

}

export const app = new App().app;
