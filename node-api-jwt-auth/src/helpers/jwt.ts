import * as jwt from 'jsonwebtoken';

export type TokenPayload = {
  id: string;
};

export const generateJwtToken = (payload: TokenPayload, jwtSecret: string, jwtExpire: string | number): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });
};

export const decodeJwtToken = (token: string, jwtSecret: string): Promise<TokenPayload> => {
  return new Promise((resolve, reject): void => {
    jwt.verify(token, jwtSecret, (err: jwt.VerifyErrors | null, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          reject(new Error('Token expired'));
        }

        reject(new Error('Token is not valid'));
      }

      resolve(decoded as TokenPayload);
    });
  });
};
