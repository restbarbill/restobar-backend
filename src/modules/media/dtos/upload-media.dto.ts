import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UploadMediaDto {
  @ApiPropertyOptional({
    description: 'Subcarpeta dentro del entorno de Cloudinary (ej. products, tournaments, avatars)',
    default: 'products',
  })
  @IsOptional()
  @IsString()
  subfolder?: string;
}
