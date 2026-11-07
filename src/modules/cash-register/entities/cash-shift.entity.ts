import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entities/base.entity';

export enum CashShiftStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

@Entity('cash_shifts')
export class CashShift extends CustomBaseEntity {
  @Column({ name: 'cashier_name', type: 'varchar', length: 120 })
  cashierName: string;

  @Column({ type: 'enum', enum: CashShiftStatus, default: CashShiftStatus.OPEN })
  status: CashShiftStatus;

  @Column({ name: 'opening_balance', type: 'numeric', precision: 12, scale: 2, default: 0 })
  openingBalance: number;

  @Column({ name: 'cash_sales', type: 'numeric', precision: 12, scale: 2, default: 0 })
  cashSales: number;

  @Column({ name: 'card_sales', type: 'numeric', precision: 12, scale: 2, default: 0 })
  cardSales: number;

  @Column({ name: 'transfer_sales', type: 'numeric', precision: 12, scale: 2, default: 0 })
  transferSales: number;

  @Column({ name: 'declared_closing_cash', type: 'numeric', precision: 12, scale: 2, nullable: true })
  declaredClosingCash?: number | null;

  @Column({ name: 'difference_amount', type: 'numeric', precision: 12, scale: 2, nullable: true })
  differenceAmount?: number | null;

  @Column({ name: 'opened_at', type: 'timestamptz' })
  openedAt: Date;

  @Column({ name: 'closed_at', type: 'timestamptz', nullable: true })
  closedAt?: Date | null;
}
