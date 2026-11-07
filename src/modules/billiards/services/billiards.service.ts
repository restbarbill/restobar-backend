import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Decimal from 'decimal.js';
import {
  BilliardSession,
  BilliardSessionStatus,
} from '../entities/billiard-session.entity';
import { StartBilliardSessionDto } from '../dtos/start-billiard-session.dto';
import { BilliardsGateway } from '../gateways/billiards.gateway';

@Injectable()
export class BilliardsService {
  constructor(
    @InjectRepository(BilliardSession)
    private readonly sessionRepository: Repository<BilliardSession>,
    private readonly gateway: BilliardsGateway,
  ) {}

  async startSession(dto: StartBilliardSessionDto): Promise<BilliardSession> {
    const active = await this.sessionRepository.findOne({
      where: { tableId: dto.tableId, status: BilliardSessionStatus.ACTIVE },
    });

    if (active) {
      throw new BadRequestException('Esta mesa de billar ya tiene una sesión de tiempo activa');
    }

    const session = this.sessionRepository.create({
      ...dto,
      status: BilliardSessionStatus.ACTIVE,
      startedAt: new Date(),
      minutesPlayed: 0,
      totalCharge: 0,
    });

    const saved = await this.sessionRepository.save(session);
    this.gateway.emitSessionUpdated(saved);
    return saved;
  }

  async findAllActive(): Promise<BilliardSession[]> {
    return this.sessionRepository.find({
      where: { status: BilliardSessionStatus.ACTIVE },
      order: { startedAt: 'DESC' },
    });
  }

  async stopAndCalculateSession(id: string): Promise<BilliardSession> {
    const session = await this.sessionRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Sesión de billar ${id} no encontrada`);
    }
    if (session.status === BilliardSessionStatus.COMPLETED) {
      throw new BadRequestException('Esta sesión de billar ya fue cerrada previamente');
    }

    const endedAt = new Date();
    const diffMs = endedAt.getTime() - new Date(session.startedAt).getTime();
    const rawMinutes = Math.max(1, Math.ceil(diffMs / 60000));

    const totalCharge = new Decimal(session.hourlyRate)
      .div(60)
      .mul(rawMinutes)
      .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
      .toNumber();

    session.endedAt = endedAt;
    session.minutesPlayed = rawMinutes;
    session.totalCharge = totalCharge;
    session.status = BilliardSessionStatus.COMPLETED;

    const saved = await this.sessionRepository.save(session);
    this.gateway.emitSessionUpdated(saved);
    return saved;
  }
}
