import nodemailer from 'nodemailer';
import config from '../config';
import LoggerInstance from './logger';

const mailer = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: Number(config.EMAIL_PORT),
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD,
  },
});

mailer.on('error', (err) => LoggerInstance.warn(`mailer error: ${err}`));

export default mailer;
