import { IsNotEmpty, IsEmail } from 'class-validator';

export default class ChangePasswordDTO {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly code: string;

  @IsNotEmpty()
  readonly password: string;

  constructor({ email, password, code }) {
    this.email = email;
    this.password = password;
    this.code = code;
  }
}
