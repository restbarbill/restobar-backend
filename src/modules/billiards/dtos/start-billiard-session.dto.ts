import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { BilliardSessionMode } from '../entities/billiard-session.entity';

export class StartBilliardSessionDto {
  @ApiProperty({ description: 'UUID de la mesa de billar' })
  @IsUUID()
  tableId: string;

  @ApiProperty({ example: 'Billar Pool #1' })
  @IsString()
  @IsNotEmpty()
  tableName: string;

  @ApiProperty({ enum: BilliardSessionMode, default: BilliardSessionMode.OPEN_TIME })
  @IsEnum(BilliardSessionMode)
  mode: BilliardSessionMode;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  playerCount: number;

  @ApiProperty({ description: 'Tarifa por hora aplicable en pesos/moneda local', example: 120 })
  @IsNumber()
  @Min(1)
  hourlyRate: number;

  @ApiPropertyOptional({ description: 'Minutos contratados si es modo PREPAID', example: 60 })
  @IsOptional()
  @IsInt()
  @Min(15)
  prepaidMinutes?: number;

  @ApiPropertyOptional({ example: 'Juego de bolas Aramith #1 + 2 tacos + INE en garantía' })
  @IsOptional()
  @IsString()
  accessoriesNotes?: string;
}
