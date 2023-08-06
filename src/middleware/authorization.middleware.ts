import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ status: 'failed', message: 'No token' });

  jwt.verify(token, process.env.SECRET_KEY as string, async (err: any, decoded: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ status: 'failed', message: 'Token has expired' });
      }
      return res.status(401).json({ status: 'failed', message: 'Invalid token' });
    }

    (<any>req).user = decoded;

    next();
  });
};

export const authorizedRole = (roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (roles.length && !roles.includes((<any>req).user.role.toLowerCase())) {
      return res
        .status(403)
        .json({
          status: 'failed',
          message: "You don't have the permission to perform this action",
        });
    }
    next();
  };
};
