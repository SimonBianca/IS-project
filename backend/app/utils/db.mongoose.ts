import {getLogger} from './logger';
import {getConfig} from '../config/server-config';
import { Mongoose } from 'mongoose';

export const MongooseDB = (function () {
    var instance: Mongoose;
    var config = getConfig().databaseConfig;

    return {
        getInstance: getInstance,
        connectiontURL: `mongodb://${config.host}:${config.port}/${config.name}`,
        status: () => getInstance().connection.readyState
    };

    function getInstance(): Mongoose {
        if (!instance) {
            instance = require('mongoose');
        }
        return instance;
    }
})();

const logger = getLogger("Mongo Database connection");

export async function connectToDatabase(url: string) {
    return new Promise((resolve) => {
        MongooseDB.getInstance().connection
            .on('error', (error: string) => {
                logger.error(`Unable to connect to the database: ${error}`);
                setTimeout(() => MongooseDB.getInstance().connect(url), 500);
            })
            .on('open', () => {
                logger.info(`Database connection opened`);
                resolve(MongooseDB.getInstance().connections[0]);
            })
            .on('close', () => {
                logger.info(`Database connection closed`);
            });
        MongooseDB.getInstance().connect(url);
        logger.info('Connecting to the database ...')
    });
}

export const DATABASE_STATUS = {
    DISCONNECTED: 0,
    CONNECTED: 1,
    CONNECTING: 2,
    DISCONNECTING: 3
};

