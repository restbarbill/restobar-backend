import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entities/base.entity';

export enum TableCategory {
  RESTAURANT = 'RESTAURANT',
  BAR = 'BAR',
  BILLIARD_POOL = 'BILLIARD_POOL',
  BILLIARD_CAROM = 'BILLIARD_CAROM',
  BILLIARD_SNOOKER = 'BILLIARD_SNOOKER',
}

export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  IN_PLAY = 'IN_PLAY',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  RESERVED = 'RESERVED',
}

@Entity('venue_tables')
export class VenueTable extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ name: 'zone_name', type: 'varchar', length: 60, default: 'Salón Principal' })
  zoneName: string;

  @Column({ type: 'enum', enum: TableCategory, default: TableCategory.RESTAURANT })
  category: TableCategory;

  @Column({ type: 'enum', enum: TableStatus, default: TableStatus.AVAILABLE })
  status: TableStatus;

  @Column({ type: 'int', default: 4 })
  capacity: number;

  @Column({ name: 'hourly_rate', type: 'numeric', precision: 12, scale: 2, default: 0 })
  hourlyRate: number;

  @Column({ name: 'pos_x', type: 'int', default: 0 })
  posX: number;

  @Column({ name: 'pos_y', type: 'int', default: 0 })
  posY: number;

  @Column({ name: 'relay_ip_address', type: 'varchar', length: 80, nullable: true })
  relayIpAddress?: string | null;
}
