import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { KdsStation, KdsTicketStatus } from '../entities/kds-ticket.entity';

export class CreateKdsTicketDto {
  @ApiProperty({ example: 'ORD-849201' })
  @IsString()
  @IsNotEmpty()
  orderNumber: string;

  @ApiProperty({ example: 'Billar Pool #2' })
  @IsString()
  @IsNotEmpty()
  tableLabel: string;

  @ApiProperty({ enum: KdsStation, default: KdsStation.KITCHEN })
  @IsEnum(KdsStation)
  station: KdsStation;

  @ApiProperty({ example: '2x Orden Alitas BBQ (Sin apio), 1x Papas Gajo' })
  @IsString()
  @IsNotEmpty()
  itemsSummary: string;
}

export class UpdateKdsStatusDto {
  @ApiProperty({ enum: KdsTicketStatus })
  @IsEnum(KdsTicketStatus)
  status: KdsTicketStatus;
}
