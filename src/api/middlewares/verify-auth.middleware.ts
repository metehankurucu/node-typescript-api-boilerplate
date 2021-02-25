import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import AuthService from '../components/auth/auth.service';

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.Authorization || req.headers.authorization || req.query.token;

  if (token) {
    token = (token as string).replace('Bearer', '').trim();
    if (token) {
      const authService = Container.get(AuthService);
      const decoded = authService.verifyToken(token);
      if (decoded) {
        req.decoded = decoded;
        return next();
      }
    }
  }

  return res.status(403).json({
    result: false,
    message: 'Authorization failed.',
  });
};

export default verifyAuth;
