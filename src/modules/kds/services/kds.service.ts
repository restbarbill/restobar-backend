import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KdsTicket, KdsStation, KdsTicketStatus } from '../entities/kds-ticket.entity';
import { CreateKdsTicketDto, UpdateKdsStatusDto } from '../dtos/create-kds-ticket.dto';

@Injectable()
export class KdsService {
  constructor(
    @InjectRepository(KdsTicket)
    private readonly kdsRepository: Repository<KdsTicket>,
  ) {}

  async createTicket(dto: CreateKdsTicketDto): Promise<KdsTicket> {
    const ticket = this.kdsRepository.create({
      ...dto,
      status: KdsTicketStatus.PENDING,
    });
    return this.kdsRepository.save(ticket);
  }

  async findActiveByStation(station?: KdsStation): Promise<KdsTicket[]> {
    const where = station ? { station } : {};
    return this.kdsRepository.find({
      where,
      order: { createdAt: 'ASC' },
    });
  }

  async updateStatus(id: string, dto: UpdateKdsStatusDto): Promise<KdsTicket> {
    const ticket = await this.kdsRepository.findOne({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket de preparación ${id} no encontrado`);
    }
    ticket.status = dto.status;
    return this.kdsRepository.save(ticket);
  }
}
