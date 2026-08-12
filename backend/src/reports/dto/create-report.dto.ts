import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['persona', 'mascota'])
  type!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['desaparecido', 'encontrado'])
  status?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @Type(() => Boolean)
  @IsBoolean()
  dataPolicyAccepted!: boolean;
}