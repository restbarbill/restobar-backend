import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entities/base.entity';

export enum KdsStation {
  KITCHEN = 'KITCHEN',
  BAR = 'BAR',
}

export enum KdsTicketStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
}

@Entity('kds_tickets')
export class KdsTicket extends CustomBaseEntity {
  @Column({ name: 'order_number', type: 'varchar', length: 30 })
  orderNumber: string;

  @Column({ name: 'table_label', type: 'varchar', length: 80 })
  tableLabel: string;

  @Column({ type: 'enum', enum: KdsStation, default: KdsStation.KITCHEN })
  station: KdsStation;

  @Column({ name: 'items_summary', type: 'text' })
  itemsSummary: string;

  @Column({ type: 'enum', enum: KdsTicketStatus, default: KdsTicketStatus.PENDING })
  status: KdsTicketStatus;
}
