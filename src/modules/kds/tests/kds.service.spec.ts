import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KdsService } from '../services/kds.service';
import { KdsTicket } from '../entities/kds-ticket.entity';

describe('KdsService', () => {
  let service: KdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KdsService,
        {
          provide: getRepositoryToken(KdsTicket),
          useValue: { find: jest.fn().mockResolvedValue([]) },
        },
      ],
    }).compile();

    service = module.get<KdsService>(KdsService);
  });

  it('should list active KDS tickets', async () => {
    await expect(service.findActiveByStation()).resolves.toEqual([]);
  });
});
