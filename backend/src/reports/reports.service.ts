import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { unlink } from 'fs/promises';
import { join } from 'path';

import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { CreateRemovalRequestDto } from './dto/create-removal-request.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto) {
    return this.prisma.report.create({
      data: createReportDto,
    });
  }

  async findAll() {
    return this.prisma.report.findMany({
      where: {
        isHidden: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException(
        `No se encontró el reporte con ID ${id}`,
      );
    }

    return report;
  }

  async update(
    id: number,
    updateReportDto: UpdateReportDto,
  ) {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException(
        `No se encontró el reporte con ID ${id}`,
      );
    }

    return this.prisma.report.update({
      where: {
        id,
      },
      data: updateReportDto,
    });
  }

  async createRemovalRequest(
    data: CreateRemovalRequestDto,
  ) {
    const report = await this.prisma.report.findUnique({
      where: {
        id: data.reportId,
      },
    });

    if (!report) {
      throw new NotFoundException(
        `No se encontró el reporte con ID ${data.reportId}`,
      );
    }

    return this.prisma.reportRemovalRequest.create({
      data: {
        reportId: data.reportId,
        name: data.name,
        email: data.email,
        reason: data.reason,
      },
    });
  }

  async remove(id: number) {
    const report = await this.prisma.report.findUnique({
      where: {
        id,
      },
    });

    if (!report) {
      throw new NotFoundException(
        `No se encontró el reporte con ID ${id}`,
      );
    }

    const deletedReport = await this.prisma.report.delete({
      where: {
        id,
      },
    });

    if (report.photoUrl) {
      const filename = report.photoUrl.replace(
        '/uploads/',
        '',
      );

      const filePath = join(
        process.cwd(),
        'uploads',
        filename,
      );

      try {
        await unlink(filePath);

        console.log(
          `Fotografía eliminada: ${filename}`,
        );
      } catch (error) {
        console.error(
          `No se pudo eliminar la fotografía ${filename}:`,
          error,
        );
      }
    }

    return deletedReport;
  }
}