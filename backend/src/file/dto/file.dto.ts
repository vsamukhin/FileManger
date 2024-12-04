import { IsOptional, IsString } from 'class-validator';

export class FileDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  extension: string;
}
