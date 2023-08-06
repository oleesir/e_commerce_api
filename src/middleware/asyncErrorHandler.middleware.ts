import { Request, Response, NextFunction } from 'express';
const asyncErrorHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncErrorHandler;

// gotten from https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
