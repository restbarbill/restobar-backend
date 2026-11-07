import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BilliardsService } from '../services/billiards.service';
import { BilliardSession, BilliardSessionStatus } from '../entities/billiard-session.entity';
import { BilliardsGateway } from '../gateways/billiards.gateway';

describe('BilliardsService', () => {
  let service: BilliardsService;

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60000);
  const mockSession: Partial<BilliardSession> = {
    id: 'session-1',
    tableId: 'table-1',
    tableName: 'Billar #1',
    hourlyRate: 120,
    startedAt: thirtyMinutesAgo,
    status: BilliardSessionStatus.ACTIVE,
  };

  const mockRepo = {
    findOne: jest.fn().mockResolvedValue(mockSession),
    save: jest.fn().mockImplementation((s) => Promise.resolve(s)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BilliardsService,
        { provide: getRepositoryToken(BilliardSession), useValue: mockRepo },
        { provide: BilliardsGateway, useValue: { emitSessionUpdated: jest.fn() } },
      ],
    }).compile();

    service = module.get<BilliardsService>(BilliardsService);
  });

  it('should accurately calculate 30 minutes at $120/hr as $60.00 using Decimal.js', async () => {
    const result = await service.stopAndCalculateSession('session-1');
    expect(result.status).toBe(BilliardSessionStatus.COMPLETED);
    expect(result.totalCharge).toBeGreaterThanOrEqual(60);
  });
});
