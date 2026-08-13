import {
  IsBooleanString,
  IsOptional,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(
  CreateReportDto,
) {
  @IsOptional()
  @IsBooleanString()
  deletePhoto?: string;
}