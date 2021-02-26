import { IsEmail, IsOptional } from 'class-validator';

export default class UpdateCurrentUserDTO {
  readonly firstname?: string;

  readonly lastname?: string;

  readonly password?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  readonly thumbnail?: string;

  constructor({ firstname, lastname, email, password, thumbnail }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.thumbnail = thumbnail;
  }
}
