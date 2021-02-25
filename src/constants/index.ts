import { UserRole, UserStatus } from './enums';

export const UserStatuses: UserStatus[] = [
  UserStatus.Blocked,
  UserStatus.Passive,
  UserStatus.Active,
  UserStatus.Verified,
];

export const UserRoles: UserRole[] = [UserRole.Normal, UserRole.Admin, UserRole.SuperAdmin];

export const AdminRoles: UserRole[] = [UserRole.Admin, UserRole.SuperAdmin];
