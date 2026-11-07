import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entities/base.entity';

export enum BilliardGameType {
  POOL_8 = 'POOL_8',
  POOL_9 = 'POOL_9',
  POOL_10 = 'POOL_10',
  CARAMBOLA = 'CARAMBOLA',
}

export enum TournamentFormat {
  SINGLE_ELIMINATION = 'SINGLE_ELIMINATION',
  DOUBLE_ELIMINATION = 'DOUBLE_ELIMINATION',
  ROUND_ROBIN = 'ROUND_ROBIN',
}

export enum TournamentStatus {
  DRAFT = 'DRAFT',
  REGISTRATION_OPEN = 'REGISTRATION_OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity('tournaments')
export class Tournament extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 140 })
  name: string;

  @Column({ name: 'game_type', type: 'enum', enum: BilliardGameType, default: BilliardGameType.POOL_8 })
  gameType: BilliardGameType;

  @Column({ type: 'enum', enum: TournamentFormat, default: TournamentFormat.SINGLE_ELIMINATION })
  format: TournamentFormat;

  @Column({ type: 'enum', enum: TournamentStatus, default: TournamentStatus.REGISTRATION_OPEN })
  status: TournamentStatus;

  @Column({ name: 'max_players', type: 'int', default: 16 })
  maxPlayers: number;

  @Column({ name: 'registered_players', type: 'int', default: 0 })
  registeredPlayers: number;

  @Column({ name: 'entry_fee', type: 'numeric', precision: 12, scale: 2, default: 0 })
  entryFee: number;

  @Column({ name: 'prize_pool', type: 'numeric', precision: 12, scale: 2, default: 0 })
  prizePool: number;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate: Date;

  @Column({ name: 'banner_url', type: 'varchar', nullable: true })
  bannerUrl?: string | null;

  @Column({ name: 'rules_notes', type: 'text', nullable: true })
  rulesNotes?: string | null;
}
