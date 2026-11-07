import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Decimal from 'decimal.js';
import { Order, OrderStatus } from '../entities/order.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class PosService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const subtotal = new Decimal(dto.subtotal ?? 0);
    const billiardCharge = new Decimal(dto.billiardCharge ?? 0);
    const totalAmount = subtotal.plus(billiardCharge).toDecimalPlaces(2).toNumber();

    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const order = this.orderRepository.create({
      orderNumber,
      tableId: dto.tableId ?? null,
      customerLabel: dto.customerLabel,
      status: OrderStatus.OPEN,
      subtotal: subtotal.toNumber(),
      billiardCharge: billiardCharge.toNumber(),
      totalAmount,
    });

    return this.orderRepository.save(order);
  }

  async findAllOpen(): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status: OrderStatus.OPEN },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Comanda con ID ${id} no encontrada`);
    }
    return order;
  }
}
