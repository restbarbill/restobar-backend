import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { MediaService } from '../services/media.service';

describe('MediaService', () => {
  let service: MediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('restobar-dev') },
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should throw BadRequestException when file is missing', async () => {
    await expect(
      service.uploadImage(undefined as unknown as Express.Multer.File),
    ).rejects.toThrow(BadRequestException);
  });
});
