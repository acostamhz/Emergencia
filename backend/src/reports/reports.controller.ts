import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { ReportsService } from './reports.service';

import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { CreateRemovalRequestDto } from './dto/create-removal-request.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',

        filename: (_request, file, callback) => {
          const extension = extname(
            file.originalname,
          ).toLowerCase();

          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extension}`;

          callback(null, uniqueName);
        },
      }),

      limits: {
        fileSize: 5 * 1024 * 1024,
      },

      fileFilter: (_request, file, callback) => {
        const allowedMimeTypes = [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException(
              'La fotografía debe ser JPG, PNG, WEBP o GIF.',
            ),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    console.log(
      'Datos recibidos:',
      createReportDto,
    );

    console.log(
      'Fotografía recibida:',
      photo?.originalname,
    );

    console.log(
      'Fotografía guardada como:',
      photo?.filename,
    );

    const reportData = {
      ...createReportDto,

      age:
        createReportDto.age !== undefined
          ? Number(createReportDto.age)
          : undefined,

      latitude:
        createReportDto.latitude !== undefined
          ? Number(createReportDto.latitude)
          : undefined,

      longitude:
        createReportDto.longitude !== undefined
          ? Number(createReportDto.longitude)
          : undefined,

      photoUrl: photo
        ? `/uploads/${photo.filename}`
        : undefined,
    };

    return this.reportsService.create(
      reportData,
    );
  }

  @Post('removal-request')
  createRemovalRequest(
    @Body()
    data: CreateRemovalRequestDto,
  ) {
    return this.reportsService.createRemovalRequest(
      data,
    );
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateReportDto: UpdateReportDto,
  ) {
    return this.reportsService.update(
      id,
      updateReportDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.reportsService.remove(id);
  }
}