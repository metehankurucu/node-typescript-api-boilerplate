import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import rateLimit from 'express-rate-limit';
import createError from 'http-errors';

import routes from '../api/routes';

export default async ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  app.use(express.urlencoded({ extended: false }));

  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  app.use('/api/', apiLimiter);

  // Load API routes
  app.use('/api', routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new createError.NotFound();
    next(err);
  });

  /// error handler
  app.use((err, req, res, next) => {
    let status;
    if (err.status) status = err.status === 400 ? 200 : err.status;
    else status = 500;

    res.status(status);
    res.json({
      result: false,
      error: err,
      message: err.message,
    });
  });
};
