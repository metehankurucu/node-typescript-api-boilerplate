import { IsNotEmpty, IsEmail } from 'class-validator';

export default class VerifyResetCodeDTO {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly code: string;

  constructor({ email, code }) {
    this.email = email;
    this.code = code;
  }
}
