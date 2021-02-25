import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateUserDTO {
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
