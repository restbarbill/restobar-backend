import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from '../../../common/entities/base.entity';

export enum OrderStatus {
  OPEN = 'OPEN',
  IN_PREPARATION = 'IN_PREPARATION',
  READY = 'READY',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order extends CustomBaseEntity {
  @Column({ name: 'order_number', type: 'varchar', length: 30, unique: true })
  orderNumber: string;

  @Column({ name: 'table_id', type: 'uuid', nullable: true })
  tableId?: string | null;

  @Column({ name: 'customer_label', type: 'varchar', length: 100, default: 'Cliente General' })
  customerLabel: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.OPEN })
  status: OrderStatus;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  subtotal: number;

  @Column({ name: 'billiard_charge', type: 'numeric', precision: 12, scale: 2, default: 0 })
  billiardCharge: number;

  @Column({ name: 'discount_amount', type: 'numeric', precision: 12, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ name: 'tip_amount', type: 'numeric', precision: 12, scale: 2, default: 0 })
  tipAmount: number;

  @Column({ name: 'total_amount', type: 'numeric', precision: 12, scale: 2, default: 0 })
  totalAmount: number;
}
