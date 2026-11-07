import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entities/base.entity';

export enum BilliardSessionMode {
  OPEN_TIME = 'OPEN_TIME',
  PREPAID = 'PREPAID',
}

export enum BilliardSessionStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('billiard_sessions')
export class BilliardSession extends CustomBaseEntity {
  @Column({ name: 'table_id', type: 'uuid' })
  tableId: string;

  @Column({ name: 'table_name', type: 'varchar', length: 60 })
  tableName: string;

  @Column({ type: 'enum', enum: BilliardSessionMode, default: BilliardSessionMode.OPEN_TIME })
  mode: BilliardSessionMode;

  @Column({ type: 'enum', enum: BilliardSessionStatus, default: BilliardSessionStatus.ACTIVE })
  status: BilliardSessionStatus;

  @Column({ name: 'player_count', type: 'int', default: 2 })
  playerCount: number;

  @Column({ name: 'hourly_rate', type: 'numeric', precision: 12, scale: 2 })
  hourlyRate: number;

  @Column({ name: 'prepaid_minutes', type: 'int', nullable: true })
  prepaidMinutes?: number | null;

  @Column({ name: 'started_at', type: 'timestamptz' })
  startedAt: Date;

  @Column({ name: 'ended_at', type: 'timestamptz', nullable: true })
  endedAt?: Date | null;

  @Column({ name: 'minutes_played', type: 'int', default: 0 })
  minutesPlayed: number;

  @Column({ name: 'total_charge', type: 'numeric', precision: 12, scale: 2, default: 0 })
  totalCharge: number;

  @Column({ name: 'accessories_notes', type: 'varchar', length: 250, nullable: true })
  accessoriesNotes?: string | null;
}
