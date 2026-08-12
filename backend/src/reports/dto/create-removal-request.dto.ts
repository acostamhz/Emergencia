import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateRemovalRequestDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  reportId!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  reason!: string;
}