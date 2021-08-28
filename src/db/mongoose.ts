import mongoose from 'mongoose';
import config from '../configs/configVar';
import logger from '../configs/logger';


function connection() {
    return mongoose
        .connect(config.mongo.url, config.mongo.options)
        .then((result) => {
            logger.info(process.env.NAMESPACE as string, 'Mongo Connected');
        })
        .catch((error) => {
            logger.error(process.env.NAMESPACE as string, error.message, error);
        });
}

export default connection;
