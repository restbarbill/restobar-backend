import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TournamentService } from '../services/tournament.service';
import {
  BilliardGameType,
  Tournament,
  TournamentFormat,
} from '../entities/tournament.entity';

describe('TournamentService', () => {
  let service: TournamentService;

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((entity) => Promise.resolve({ id: 't-1', ...entity })),
    find: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TournamentService,
        { provide: getRepositoryToken(Tournament), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<TournamentService>(TournamentService);
  });

  it('should calculate prizePool automatically using Decimal.js when not provided', async () => {
    const created = await service.create({
      name: 'Torneo Bola 8',
      gameType: BilliardGameType.POOL_8,
      format: TournamentFormat.SINGLE_ELIMINATION,
      maxPlayers: 16,
      entryFee: 150,
      startDate: '2026-11-20T20:00:00.000Z',
    });

    expect(created.prizePool).toBe(2400);
  });
});
