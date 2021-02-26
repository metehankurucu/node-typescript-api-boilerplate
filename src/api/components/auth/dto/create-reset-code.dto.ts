import { IsEmail } from 'class-validator';

export default class CreateResetCodeDTO {
  @IsEmail()
  readonly email: string;

  constructor({ email }) {
    this.email = email;
  }
}
