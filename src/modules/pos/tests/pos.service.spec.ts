import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PosService } from '../services/pos.service';
import { Order } from '../entities/order.entity';

describe('PosService', () => {
  let service: PosService;

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((e) => Promise.resolve({ id: 'ord-1', ...e })),
    find: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PosService,
        { provide: getRepositoryToken(Order), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<PosService>(PosService);
  });

  it('should calculate unified total (subtotal + billiardCharge) using Decimal.js', async () => {
    const order = await service.createOrder({
      customerLabel: 'Mesa Billar 1',
      subtotal: 250.5,
      billiardCharge: 120.25,
    });
    expect(order.totalAmount).toBe(370.75);
  });
});
