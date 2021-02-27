import { IsOptional, IsInt, Min, Max } from 'class-validator';

export default class GetUsersDTO {
  @IsOptional()
  @Min(0)
  @IsInt()
  readonly offset?: number;

  @IsOptional()
  @Min(1)
  @Max(100)
  @IsInt()
  readonly limit?: number;

  constructor({ offset, limit }) {
    this.offset = offset ? Number(offset) : 0;
    this.limit = limit ? Number(limit) : 50;
  }
}
