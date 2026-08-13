import { Module } from '@nestjs/common';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CloudinaryModule } from '../cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
  ],

  controllers: [
    ReportsController,
  ],

  providers: [
    ReportsService,
  ],
})
export class ReportsModule {}