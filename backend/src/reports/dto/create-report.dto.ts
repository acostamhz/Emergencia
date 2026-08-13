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
} from "class-validator";

import { Transform, Type } from "class-transformer";

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(["persona", "mascota"])
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
  @IsIn(["desaparecido", "encontrado"])
  status?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @Transform(({ value }) => {
    if (value === "true" || value === true) {
      return true;
    }

    if (value === "false" || value === false) {
      return false;
    }

    return value;
  })
  @IsBoolean()
  dataPolicyAccepted!: boolean;
}