import expressLoader from './express';
import dependencyInjectorLoader from './dependency-injector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';
import postStartup from './post-startup';
import monitorLoader from './monitor';
// required to trigger events
import './events';

export default async ({ expressApp }) => {
  await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * Load models to dependecy injector
   */

  await dependencyInjectorLoader();

  Logger.info('✌️ Dependency Injector loaded');

  await monitorLoader({ app: expressApp });

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

  await postStartup();
  Logger.info('✌️ Post startup executed');

  await jobsLoader();
  Logger.info('✌️ Jobs loaded');
};
