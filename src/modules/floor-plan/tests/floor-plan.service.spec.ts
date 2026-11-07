import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FloorPlanService } from '../services/floor-plan.service';
import { VenueTable } from '../entities/venue-table.entity';

describe('FloorPlanService', () => {
  let service: FloorPlanService;

  const mockRepo = {
    find: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((e) => Promise.resolve({ id: 'table-1', ...e })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FloorPlanService,
        { provide: getRepositoryToken(VenueTable), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<FloorPlanService>(FloorPlanService);
  });

  it('should list all tables from database', async () => {
    const tables = await service.findAll();
    expect(Array.isArray(tables)).toBe(true);
    expect(mockRepo.find).toHaveBeenCalled();
  });
});
