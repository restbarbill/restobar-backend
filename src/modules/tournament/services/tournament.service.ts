import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Decimal from 'decimal.js';
import { Tournament } from '../entities/tournament.entity';
import { CreateTournamentDto } from '../dtos/create-tournament.dto';
import { UpdateTournamentDto } from '../dtos/update-tournament.dto';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(dto: CreateTournamentDto): Promise<Tournament> {
    const calculatedPrizePool =
      dto.prizePool !== undefined
        ? dto.prizePool
        : new Decimal(dto.entryFee).mul(dto.maxPlayers).toDecimalPlaces(2).toNumber();

    const tournament = this.tournamentRepository.create({
      ...dto,
      prizePool: calculatedPrizePool,
      startDate: new Date(dto.startDate),
    });

    return this.tournamentRepository.save(tournament);
  }

  async findAll(): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      order: { startDate: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({ where: { id } });
    if (!tournament) {
      throw new NotFoundException(`Torneo con ID ${id} no encontrado`);
    }
    return tournament;
  }

  async update(id: string, dto: UpdateTournamentDto): Promise<Tournament> {
    const tournament = await this.findOne(id);
    Object.assign(tournament, {
      ...dto,
      startDate: dto.startDate ? new Date(dto.startDate) : tournament.startDate,
    });
    return this.tournamentRepository.save(tournament);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const tournament = await this.findOne(id);
    await this.tournamentRepository.softRemove(tournament);
    return { deleted: true };
  }
}
