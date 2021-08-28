import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import { MainRouter } from './routes';
import logger from '../configs/logger';
const app: express.Application = express();


//middlewares
 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// cors req or not 
// app.use(cors({ origin: true, credentials: true }));

// disable console.log
console.log = function() {}

//  api call log
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    /// Log the req
    logger.info(process.env.NAMESPACE as string, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    // Log the res on finish
    res.on('finish', () => {
        logger.info(process.env.NAMESPACE as string, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});



//routes
app.use('/', MainRouter);



//error handler

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(chalk.red(error.message));
    res.status(error.statusCode || 500).json({
        error: true,
        message: error.message || 'An Error Occured',
        route: req.url,
        name: error.name || 'InteralServerError'
    });
});

export default app;
