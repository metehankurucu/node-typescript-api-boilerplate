import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserStatus, UserRole } from '../../../../constants/enums';

export class LoginUserDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

export interface UserJWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
