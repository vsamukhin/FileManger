import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { FileService } from './file/file.service';
import { FolderModule } from './folder/folder.module';
import { FolderService } from './folder/folder.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), FileModule, FolderModule],
  controllers: [],
  providers: [FileService, FolderService, PrismaService],
})
export class AppModule {}
