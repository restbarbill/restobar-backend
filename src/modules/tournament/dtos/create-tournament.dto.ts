import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  BilliardGameType,
  TournamentFormat,
  TournamentStatus,
} from '../entities/tournament.entity';

export class CreateTournamentDto {
  @ApiProperty({ example: 'Torneo Nocturno Bola 8 - Viernes VIP' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: BilliardGameType, default: BilliardGameType.POOL_8 })
  @IsEnum(BilliardGameType)
  gameType: BilliardGameType;

  @ApiProperty({ enum: TournamentFormat, default: TournamentFormat.SINGLE_ELIMINATION })
  @IsEnum(TournamentFormat)
  format: TournamentFormat;

  @ApiPropertyOptional({ enum: TournamentStatus, default: TournamentStatus.REGISTRATION_OPEN })
  @IsOptional()
  @IsEnum(TournamentStatus)
  status?: TournamentStatus;

  @ApiProperty({ example: 16 })
  @IsInt()
  @Min(4)
  maxPlayers: number;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @Min(0)
  entryFee: number;

  @ApiPropertyOptional({ example: 2400 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  prizePool?: number;

  @ApiProperty({ example: '2026-11-15T20:00:00.000Z' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: 'Eliminación directa a ganar 3 de 5 mesas.' })
  @IsOptional()
  @IsString()
  rulesNotes?: string;
}
