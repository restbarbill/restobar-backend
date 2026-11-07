import { Test, TestingModule } from '@nestjs/testing';
import { TournamentController } from '../controllers/tournament.controller';
import { TournamentService } from '../services/tournament.service';

describe('TournamentController', () => {
  let controller: TournamentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentController],
      providers: [
        {
          provide: TournamentService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<TournamentController>(TournamentController);
  });

  it('should be defined and call findAll', async () => {
    expect(controller).toBeDefined();
    await expect(controller.findAll()).resolves.toEqual([]);
  });
});
