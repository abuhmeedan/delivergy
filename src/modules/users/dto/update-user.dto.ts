import { IsEnum } from 'class-validator';
import { Statuses } from '../enums/user-statuses.enum';

export class UpdateUserDto {
  @IsEnum(Statuses)
  status: Statuses;
}
