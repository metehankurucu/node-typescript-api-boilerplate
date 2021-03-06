/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import glob from 'glob';
import path from 'path';
import { Container } from 'typedi';
import LoggerInstance from './logger';
import mailer from './mailer';

export default async () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise<void>((resolve) => {
    try {
      Container.set('logger', LoggerInstance);
      Container.set('mailer', mailer);
      // Last step load models
      glob('**/*.model.ts', (err, files) => {
        if (err) LoggerInstance.error('glob error while loading models', err);
        files.forEach((file) => {
          const modelFile = require(path.resolve(file));
          if (modelFile.modelName) {
            Container.set(modelFile.modelName, modelFile.default);
            LoggerInstance.info(`${modelFile.modelName} registered to dependency injector.`);
          } else {
            LoggerInstance.error(
              `Exported 'modelName' not found in ${file} model, so model not registered to dependency injector.`,
            );
          }
        });
        resolve();
      });
    } catch (e) {
      LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
      throw e;
    }
  });
