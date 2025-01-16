import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma.service';
import { UpdateFileDto } from './dto/file-update.dto';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.file.findMany({ where: { folderId: null } });
  }

  async getFavorites() {
    return await this.prisma.file.findMany({ where: { favorites: true } });
  }

  async findOne(id: string) {
    return await this.prisma.file.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return await this.prisma.file.findMany({ where: { name } });
  }

  async create(data: FileDto, folderID: string) {
    const checkFile = await this.prisma.file.findUnique({
      where: { name: data.name },
    });

    if (checkFile) {
      throw new BadRequestException('Файл с таким названием уже существует!');
    }

    if (!folderID) {
      return await this.prisma.file.create({
        data: data,
      });
    }

    const checkFolder = await this.prisma.folder.findUnique({
      where: { id: folderID },
    });

    if (!checkFolder) {
      throw new BadRequestException('Папка не найдена');
    }

    return await this.prisma.file.create({
      data: { ...data, folder: { connect: { id: folderID } } },
    });
  }

  async remove(id: string) {
    const checkFile = await this.prisma.file.findUnique({ where: { id } });

    if (!checkFile) {
      throw new BadRequestException('Файл не найден');
    }

    fs.unlinkSync(process.env.DIRNAME + checkFile.path);

    return await this.prisma.file.delete({ where: { id } });
  }

  async update(id: string, dto: UpdateFileDto) {
    if (dto.name) {
      const checkFile = await this.prisma.file.findUnique({
        where: { name: dto.name },
      });

      if (checkFile) {
        throw new BadRequestException('Файл с таким названием уже существует!');
      }
    }

    return this.prisma.file.update({ where: { id }, data: dto });
  }

  async downloadFile(id: string, @Res() res: Response) {
    const file = await this.prisma.file.findUnique({ where: { id: id } });

    if (!fs.existsSync(file.path)) {
      throw new BadRequestException('Файл не найден');
    }

    return res.download(file.path, file.name, (err) => {
      if (err) {
        throw new BadRequestException('Ошибка скачивания файла');
      }
    });
  }
}
