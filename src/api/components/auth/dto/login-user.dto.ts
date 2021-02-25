import { IsNotEmpty, IsEmail } from 'class-validator';

export default class LoginUserDTO {
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
