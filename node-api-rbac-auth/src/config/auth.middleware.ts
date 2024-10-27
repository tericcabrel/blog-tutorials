import { NextFunction, Request, Response } from 'express';
import { decodeJwtToken, TokenPayload } from '../helpers/jwt';
import { RoleType } from '../models/role.model';

export type CustomRequest = {
  user: { id: string };
} & Request;

const JWT_SECRET = process.env.JWT_SECRET || '';
const ALLOWED_ROUTES: string[] = ['/', '/health', '/auth/signup', '/auth/login'];

const ROUTES_ACL: Record<string, RoleType[]> = {
  '/users': [RoleType.ADMIN, RoleType.SUPER_ADMIN],
  '/users/me': [RoleType.USER, RoleType.ADMIN, RoleType.SUPER_ADMIN],
  '/auth/admins': [RoleType.SUPER_ADMIN],
};

const isAuthorizedRoute = (currentRoute: string): boolean => {
  return ALLOWED_ROUTES.some((route) => currentRoute === route);
};

const isForbiddenRoute = (currentRoute: string, userRole: RoleType): boolean => {
  return ROUTES_ACL[currentRoute] && !ROUTES_ACL[currentRoute].includes(userRole);
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

      if (isForbiddenRoute(routeName, decoded.role)) {
        return res.status(403).json({ message: 'Forbidden access' });
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
