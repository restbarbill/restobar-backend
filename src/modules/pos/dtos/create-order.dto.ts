import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiPropertyOptional({ description: 'UUID de la mesa o mesa de billar asociada' })
  @IsOptional()
  @IsUUID()
  tableId?: string;

  @ApiProperty({ example: 'Mesa Billar #1 - Grupo Juan' })
  @IsString()
  @IsNotEmpty()
  customerLabel: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  subtotal?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  billiardCharge?: number;
}
