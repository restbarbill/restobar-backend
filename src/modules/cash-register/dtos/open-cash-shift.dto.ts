import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class OpenCashShiftDto {
  @ApiProperty({ example: 'Laura Gómez (Caja Principal)' })
  @IsString()
  @IsNotEmpty()
  cashierName: string;

  @ApiProperty({ description: 'Fondo fijo inicial en efectivo', example: 1500 })
  @IsNumber()
  @Min(0)
  openingBalance: number;
}

export class CloseCashShiftDto {
  @ApiProperty({ description: 'Efectivo físico contado por el cajero al cierre (Arqueo Ciego)', example: 5420 })
  @IsNumber()
  @Min(0)
  declaredClosingCash: number;
}
