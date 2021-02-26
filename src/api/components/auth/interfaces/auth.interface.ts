import { UserStatus, UserRole } from '../../../../constants/enums';

export interface UserJWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export enum PasswordResetStatus {
  Invalid = 0,
  Valid = 1,
  Verified = 2,
}
export interface PasswordReset {
  user: string;
  email: string;
  code: string;
  status: PasswordResetStatus;
  createdAt: Date;
}
