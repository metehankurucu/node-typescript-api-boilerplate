import { IsIn, IsOptional } from 'class-validator';
import { UserRoles, UserStatuses } from '../../../../constants';
import { UserRole, UserStatus } from '../../../../constants/enums';
import UpdateCurrentUserDTO from './update-current-user.dto';

export default class UpdateUserDTO extends UpdateCurrentUserDTO {
  @IsOptional()
  @IsIn(UserStatuses)
  readonly status?: UserStatus;

  @IsOptional()
  @IsIn(UserRoles)
  readonly role?: UserRole;

  constructor({ status, role, firstname, lastname, email, password, thumbnail }) {
    super({ firstname, lastname, email, password, thumbnail });
    this.status = status;
    this.role = role;
  }
}
