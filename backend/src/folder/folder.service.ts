import { BadRequestException, Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { FolderDto } from './dto/folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FolderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}
  create(dto: FolderDto) {
    return this.prisma.folder.create({ data: dto });
  }

  async findAll() {
    return await this.prisma.folder.findMany({ where: { parentId: null } });
  }

  async findOne(id: string) {
    const checkFolder = await this.prisma.folder.findUnique({
      where: { id },
    });

    if (!checkFolder) {
      throw new BadRequestException('Папка не найдена');
    }

    return await this.prisma.folder.findUnique({
      where: { id },
      include: { files: true, subfolders: true },
    });
  }

  async getFavorites() {
    return await this.prisma.folder.findMany({ where: { favorites: true } });
  }

  async update(id: string, dto: UpdateFolderDto) {
    return await this.prisma.folder.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const checkFolder = await this.prisma.folder.findUnique({
      where: { id },
      include: { files: true },
    });
    const filesFolder = checkFolder.files;

    if (!checkFolder) {
      throw new BadRequestException('Папка не найдена');
    }

    if (filesFolder) {
      const removeFileInFolder = filesFolder.map(async (file) => {
        await this.fileService.remove(file.id);
      });

      await Promise.all(removeFileInFolder);
    }

    return await this.prisma.folder.delete({ where: { id } });
  }
}
