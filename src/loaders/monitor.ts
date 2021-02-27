/* eslint-disable @typescript-eslint/indent */
import { Application } from 'express';
import basicAuth from 'express-basic-auth';
import monitor from 'express-status-monitor';
import config from '../config';
import LoggerInstance from './logger';

export default async ({ app }: { app: Application }) => {
  if (config.MONITOR.ENABLED) {
    const monitoring = monitor({ path: null });
    app.use(monitoring);
    app.get(
      config.MONITOR.ROUTE,
      basicAuth({
        users: {
          [`${config.MONITOR.USERNAME}`]: config.MONITOR.PASSWORD,
        },
        challenge: false,
      }),
      monitoring.pageRoute,
    );
    LoggerInstance.info('✌️ Monitor enabled and loaded');
  } else {
    LoggerInstance.info('✌️ Monitor disabled');
  }
};
