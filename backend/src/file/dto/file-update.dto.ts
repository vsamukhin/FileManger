import { IsOptional, IsString } from 'class-validator';

export class UpdateFileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  folderId?: string;

  @IsOptional()
  favorites?: boolean;
}
