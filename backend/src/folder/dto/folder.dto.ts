import { IsOptional, IsString } from 'class-validator';

export class FolderDto {
  @IsString()
  name: string;

  @IsOptional()
  parentId?: string;
}
