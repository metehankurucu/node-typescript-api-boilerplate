import { UserRole, UserStatus } from '../../../../constants/enums';

export interface User {
  _id: string;
  firstname?: string;
  lastname?: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  thumbnail?: string;
  password?: string;
  lastLoginedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
}
