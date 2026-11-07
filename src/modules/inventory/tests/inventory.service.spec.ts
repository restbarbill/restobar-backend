import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InventoryService } from '../services/inventory.service';
import { Product } from '../entities/product.entity';

describe('InventoryService', () => {
  let service: InventoryService;

  const mockRepo = {
    find: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        { provide: getRepositoryToken(Product), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  it('should return products from repository', async () => {
    const res = await service.findAll();
    expect(res).toEqual([]);
  });
});
