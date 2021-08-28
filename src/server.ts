import app from './apis/app';
import http from 'http';
import chalk from 'chalk';
import { SERVER_PORT } from './configs/configVar';
import connect from './db/mongoose';

const server = http.createServer(app);

server.listen(SERVER_PORT, () => {
    console.info(chalk.bgWhite.black.bold(`Connecting to Server on port ${SERVER_PORT}`));
    console.info(chalk.bgWhite.black.bold(`Created with inspiration by Jitul Teron`));
    connect();
});
