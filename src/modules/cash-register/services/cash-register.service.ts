import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Decimal from 'decimal.js';
import { CashShift, CashShiftStatus } from '../entities/cash-shift.entity';
import { CloseCashShiftDto, OpenCashShiftDto } from '../dtos/open-cash-shift.dto';

@Injectable()
export class CashRegisterService {
  constructor(
    @InjectRepository(CashShift)
    private readonly shiftRepository: Repository<CashShift>,
  ) {}

  async openShift(dto: OpenCashShiftDto): Promise<CashShift> {
    const existingOpen = await this.shiftRepository.findOne({
      where: { status: CashShiftStatus.OPEN },
    });
    if (existingOpen) {
      throw new BadRequestException('Ya existe un turno de caja abierto actualmente');
    }

    const shift = this.shiftRepository.create({
      cashierName: dto.cashierName,
      openingBalance: dto.openingBalance,
      status: CashShiftStatus.OPEN,
      openedAt: new Date(),
    });
    return this.shiftRepository.save(shift);
  }

  async findAllShifts(): Promise<CashShift[]> {
    return this.shiftRepository.find({
      order: { openedAt: 'DESC' },
    });
  }

  async closeShift(id: string, dto: CloseCashShiftDto): Promise<CashShift> {
    const shift = await this.shiftRepository.findOne({ where: { id } });
    if (!shift) {
      throw new NotFoundException(`Turno de caja ${id} no encontrado`);
    }
    if (shift.status === CashShiftStatus.CLOSED) {
      throw new BadRequestException('Este turno de caja ya fue cerrado');
    }

    const expectedCash = new Decimal(shift.openingBalance).plus(shift.cashSales);
    const difference = new Decimal(dto.declaredClosingCash)
      .minus(expectedCash)
      .toDecimalPlaces(2)
      .toNumber();

    shift.declaredClosingCash = dto.declaredClosingCash;
    shift.differenceAmount = difference;
    shift.status = CashShiftStatus.CLOSED;
    shift.closedAt = new Date();

    return this.shiftRepository.save(shift);
  }
}
