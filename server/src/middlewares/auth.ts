import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dev from '../config/index';

export interface ICustomRequest extends Request {
  id: string | JwtPayload;
}

export interface IJWTToken {
  id: string;
}

// This should be in the middleware folder
export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: 'No cookie found',
      });
    }

    // other option req.headers.cookie.access_token
    const token = req.headers.cookie.split('=')[1];

    if (!token) {
      return res.status(404).send({
        message: 'No token found',
      });
    }

    //verify the token
    //TYPESCRIPT GUIDE https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1
    jwt.verify(token, String(dev.app.jwt), function (error, decoded) {
      if (error) {
        console.log(error);
      }
      console.log(decoded);
      (req as ICustomRequest).id = (decoded as IJWTToken).id;
      next();
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
