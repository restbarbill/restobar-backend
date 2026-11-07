import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { TableCategory, TableStatus } from '../entities/venue-table.entity';

export class CreateVenueTableDto {
  @ApiProperty({ example: 'Billar Pool #1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Zona de Billar' })
  @IsString()
  @IsNotEmpty()
  zoneName: string;

  @ApiProperty({ enum: TableCategory, default: TableCategory.BILLIARD_POOL })
  @IsEnum(TableCategory)
  category: TableCategory;

  @ApiPropertyOptional({ enum: TableStatus, default: TableStatus.AVAILABLE })
  @IsOptional()
  @IsEnum(TableStatus)
  status?: TableStatus;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @ApiPropertyOptional({ description: 'Tarifa por hora si es mesa de billar', example: 120 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  hourlyRate?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsInt()
  posX?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsInt()
  posY?: number;
}
