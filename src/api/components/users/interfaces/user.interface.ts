import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole, UserStatus } from '../../../../constants/enums';

export interface User {
  _id: string;
  firstname: string;
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

export class CreateUserDTO {
  readonly firstname: string;

  readonly lastname: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  constructor({ firstname, lastname, email, password }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}
