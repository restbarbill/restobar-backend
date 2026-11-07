import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VenueTable } from '../entities/venue-table.entity';
import { CreateVenueTableDto } from '../dtos/create-venue-table.dto';
import { UpdateVenueTableDto } from '../dtos/update-venue-table.dto';

@Injectable()
export class FloorPlanService {
  constructor(
    @InjectRepository(VenueTable)
    private readonly tableRepository: Repository<VenueTable>,
  ) {}

  async create(dto: CreateVenueTableDto): Promise<VenueTable> {
    const table = this.tableRepository.create(dto);
    return this.tableRepository.save(table);
  }

  async findAll(): Promise<VenueTable[]> {
    return this.tableRepository.find({
      order: { zoneName: 'ASC', name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<VenueTable> {
    const table = await this.tableRepository.findOne({ where: { id } });
    if (!table) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada`);
    }
    return table;
  }

  async update(id: string, dto: UpdateVenueTableDto): Promise<VenueTable> {
    const table = await this.findOne(id);
    Object.assign(table, dto);
    return this.tableRepository.save(table);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const table = await this.findOne(id);
    await this.tableRepository.softRemove(table);
    return { deleted: true };
  }
}
