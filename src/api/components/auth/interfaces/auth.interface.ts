import { UserStatus, UserRole } from '../../../../constants/enums';

export interface UserJWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
