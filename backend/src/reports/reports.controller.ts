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
import { extname, join } from 'path';
import { unlink } from 'fs/promises';

import { ReportsService } from './reports.service';
import { CloudinaryService } from '../cloudinary.service';

import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { CreateRemovalRequestDto } from './dto/create-removal-request.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly cloudinaryService: CloudinaryService,
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
  async create(
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
      'Fotografía guardada temporalmente:',
      photo?.filename,
    );

    let photoUrl: string | undefined;

    if (photo) {
      const temporaryPath = join(
        process.cwd(),
        'uploads',
        photo.filename,
      );

      try {
        console.log(
          'Subiendo fotografía a Cloudinary...',
        );

        photoUrl =
          await this.cloudinaryService.uploadImage(
            temporaryPath,
          );

        console.log(
          'Fotografía subida correctamente:',
          photoUrl,
        );
      } catch (error) {
        console.error(
          'Error subiendo fotografía a Cloudinary:',
          error,
        );

        throw new BadRequestException(
          'No se pudo almacenar la fotografía. Intenta nuevamente.',
        );
      } finally {
        try {
          await unlink(temporaryPath);

          console.log(
            'Archivo temporal eliminado:',
            photo.filename,
          );
        } catch (error) {
          console.error(
            'No se pudo eliminar el archivo temporal:',
            error,
          );
        }
      }
    }

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

      photoUrl,
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