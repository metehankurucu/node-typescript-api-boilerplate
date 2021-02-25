import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { UserRole } from '../../constants/enums';

/**
 * Must be called after calling verifyAuth to use decoded jwt
 */
const verifyAccess = (validRoles: UserRole[] = [], validSubs: string[] = []) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { role, sub } = req.decoded;

  if (validRoles.length > 0 && !validRoles.includes(role)) {
    // Cannot access this route due to status
    throw createError(403, 'You do not have permission to access this route.');
  }

  if (validSubs.length > 0 && !validSubs.includes(sub)) {
    // Cannot access this route due to sub
    throw createError(403, 'You cannot access this route.');
  }
  next();
};

export default verifyAccess;
