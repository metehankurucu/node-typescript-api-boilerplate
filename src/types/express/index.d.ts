import { UserJWTPayload } from '../../api/components/auth/interfaces/auth.interface';

declare global {
  namespace Express {
    export interface Request {
      dto?: object;
      decoded?: UserJWTPayload;
    }
  }
}
