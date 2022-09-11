import { NextFunction, Request, Response } from 'express';
import { IRateLimiterOptions, RateLimiterMemory } from 'rate-limiter-flexible';

const MAX_REQUEST_LIMIT = 100;
const MAX_REQUEST_WINDOW = 15 * 60; // Per 15 minutes by IP
const TOO_MANY_REQUESTS_MESSAGE = 'Too many requests';

const options: IRateLimiterOptions = {
  duration: MAX_REQUEST_WINDOW,
  points: MAX_REQUEST_LIMIT,
};

const rateLimiter = new RateLimiterMemory(options);

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter
    .consume(req.ip)
    .then((rateLimiterRes) => {
      res.setHeader('Retry-After', rateLimiterRes.msBeforeNext / 1000);
      res.setHeader('X-RateLimit-Limit', MAX_REQUEST_LIMIT);
      res.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
      res.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString());
      next();
    })
    .catch(() => {
      res.status(429).json({ message: TOO_MANY_REQUESTS_MESSAGE });
    });
};
