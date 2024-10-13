import { NextFunction, Request, Response } from 'express';
import { decodeJwtToken, TokenPayload } from '../helpers/jwt';

export type CustomRequest = {
  user: { id: string };
} & Request;

const JWT_SECRET = process.env.JWT_SECRET || '';
const ALLOWED_ROUTES: string[] = ['/', '/health', '/auth/signup', '/auth/login'];

const isAuthorizedRoute = (currentRoute: string): boolean => {
  return ALLOWED_ROUTES.some((route) => currentRoute === route);
};

export const authMiddleware = async (req: CustomRequest | any, res: Response, next: NextFunction) => {
  let routeName = '';

  if (req.originalUrl) {
    routeName = req.originalUrl;
  } else {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  if (isAuthorizedRoute(routeName)) {
    return next();
  }

  const token = req.headers['authorization'];

  if (token) {
    try {
      const decoded = (await decodeJwtToken(token.replace('Bearer ', ''), JWT_SECRET)) as TokenPayload | undefined;

      if (!decoded?.id) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }

      // Inject authenticated user in the Request object in order get access in the controllers
      req.user = decoded;

      return next();
    } catch (err) {
      console.error(err);
    }
  }

  return res.status(401).json({ message: 'Unauthorized access' });
};
