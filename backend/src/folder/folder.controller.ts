import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FolderDto } from './dto/folder.dto';
import { FolderService } from './folder.service';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  create(@Body() dto: FolderDto) {
    return this.folderService.create(dto);
  }

  @Get()
  async findAll() {
    return this.folderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.folderService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: FolderDto) {
    return this.folderService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.folderService.remove(id);
  }
}
