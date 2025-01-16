import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as path from 'path';
import { FileDto } from './dto/file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async findAll() {
    return this.fileService.findAll();
  }

  @Get('/favorites')
  async getFavoritesFile() {
    return this.fileService.getFavorites();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    if (!file || !body.name) {
      throw new BadRequestException('Название и файл обязательные поля!');
    }
    const fileExtension = path.extname(file.originalname);
    const folderID = body.folderId;
    const dto = {
      name: body.name as string,
      path: file.path,
      extension: fileExtension,
    };
    return this.fileService.create(dto, folderID);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: FileDto) {
    return this.fileService.update(id, dto);
  }

  @Get('/download/:id')
  async download(@Param('id') id: string, @Res() res: Response) {
    return this.fileService.downloadFile(id, res);
  }
}
