import 'reflect-metadata';

import express from 'express';
import { createServer, Server as HttpServer } from 'http';

import config from './config';
import loaders from './loaders';
import Logger from './loaders/logger';

const startServer = async () => {
  try {
    const app: express.Application = express();

    await loaders({ expressApp: app });

    /**
     * Create HTTP server.
     */

    const server: HttpServer = createServer(app);

    // Start express server
    server.listen(config.PORT);

    server.on('listening', () => {
      Logger.info(`
      ###########################################
            Server listening on port: ${config.PORT}
                in ${process.env.NODE_ENV} mode
      ###########################################
    `);
    });

    server.on('error', err => {
      Logger.error('Server Error', err);
    });

    server.on('close', () => {
      Logger.info('Server Closed');
    });
  } catch (err) {
    Logger.error(err.stack);
  }
};

startServer();
