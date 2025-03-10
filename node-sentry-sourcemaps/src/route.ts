import { captureException } from '@sentry/node';
import { Application } from 'express';

export const setupRoute = (app: Application) => {
  app.get('/error', (req, res) => {
    try {
      if (Math.random() > 0.5) {
        throw new Error('Ka booom!');
      }

      return res.json({ message: 'Success!' });
    } catch (error) {
      captureException(error);

      return res.status(400).json({ message: 'Ops error!' });
    }
  });
};
