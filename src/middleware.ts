import { Request, Response, NextFunction } from 'express';

const allowedRoutes = ['/', '/index.html',];

export function middleWare(req: Request, res: Response, next: NextFunction) {
  console.log('Request URL:', req.originalUrl);
  if (allowedRoutes.includes(req.originalUrl)) {
    console.log('Request is allowed');
    next();
  } else {
    console.log('Request is not allowed');
    res.status(403).send('Forbidden');
  }

}