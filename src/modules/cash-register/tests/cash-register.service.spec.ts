import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CashRegisterService } from '../services/cash-register.service';
import { CashShift, CashShiftStatus } from '../entities/cash-shift.entity';

describe('CashRegisterService', () => {
  let service: CashRegisterService;

  const mockShift: Partial<CashShift> = {
    id: 'shift-1',
    openingBalance: 1000,
    cashSales: 2500,
    status: CashShiftStatus.OPEN,
  };

  const mockRepo = {
    findOne: jest.fn().mockResolvedValue(mockShift),
    save: jest.fn().mockImplementation((s) => Promise.resolve(s)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CashRegisterService,
        { provide: getRepositoryToken(CashShift), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<CashRegisterService>(CashRegisterService);
  });

  it('should compute exact cash difference on blind close using Decimal.js', async () => {
    const closed = await service.closeShift('shift-1', { declaredClosingCash: 3450 });
    expect(closed.differenceAmount).toBe(-50);
    expect(closed.status).toBe(CashShiftStatus.CLOSED);
  });
});
