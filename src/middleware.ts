import { Request, Response, NextFunction } from 'express';
import geoip from 'geoip-lite';
const allowedRoutes = ['/', '/index.html',];

export function middleWare(req: Request, res: Response, next: NextFunction) {
  // Attempt to get the real IP if behind a proxy, otherwise use req.ip
  const clientIp = (req.headers['x-forwarded-for'] || req.ip) as string;
  // console.log('Incoming request from IP: ', clientIp);
  // Use geoip-lite to get the location data
  const geo = geoip.lookup(clientIp?.split(',')[0].trim());
  // console.log('User region:', geo?.region);

  const userData = {
    ip: clientIp,
    geo: geo,
    device: req.headers['user-agent'],
    host: req.hostname,
    cookies: req.cookies,
    body: req.body,
  };

  console.log(userData);

  // console.log('Method:', req.method);
  // console.log('URL:', req.originalUrl);
  // console.log('Path:', req.path);
  // console.log('Query Params:', req.query);
  // console.log('Is Secure:', req.secure);
  // console.log('Hostname:', req.hostname);
  // // Assuming body-parser middleware is used
  // console.log('Body Data:', req.body);
  // // Assuming cookie-parser middleware is used
  // console.log('Cookies:', req.cookies);
  // If using authentication middleware
  // console.log('User:', req.user);

  if (allowedRoutes.includes(req.originalUrl)) {
    // console.log('Request is allowed');
    next();
  } else {
    // console.log('Request is not allowed');
    res.status(403).send('Forbidden');
  }

}