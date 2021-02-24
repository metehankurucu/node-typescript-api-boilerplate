import expressLoader from './express';
import dependencyInjectorLoader from './dependency-injector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';

export default async ({ expressApp }) => {
  await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * Load models to dependecy injector
   */
  await dependencyInjectorLoader({
    models: [
      //   {
      //     name: 'userModel',
      //     model: require('../models/user').default,
      //   },
    ],
  });

  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

  await jobsLoader();
  Logger.info('✌️ Jobs loaded');
};
