import nodemailer from 'nodemailer';
import config from '../config';
import LoggerInstance from './logger';

const mailer = nodemailer.createTransport({
  host: config.EMAIL.HOST,
  port: Number(config.EMAIL.PORT),
  auth: {
    user: config.EMAIL.USER,
    pass: config.EMAIL.PASSWORD,
  },
});

mailer.on('error', (err) => LoggerInstance.warn(`mailer error: ${err}`));

export default mailer;
