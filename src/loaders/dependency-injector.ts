import { Container } from 'typedi';
import LoggerInstance from './logger';
import mailer from './mailer';

export default async ({ models }: { models: { name: string; model: any }[] }) => {
  try {
    models.forEach((m) => {
      Container.set(m.name, m.model);
    });

    Container.set('logger', LoggerInstance);
    Container.set('mailer', mailer);
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
