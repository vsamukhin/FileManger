import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';

@Module({
  exports: [FolderService],
  controllers: [FolderController],
  providers: [FolderService, PrismaService, FileService],
})
export class FolderModule {}
