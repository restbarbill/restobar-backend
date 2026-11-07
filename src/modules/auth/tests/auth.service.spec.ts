import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByPinCode: jest.fn().mockResolvedValue(null),
            findByEmailWithPassword: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('jwt-token') },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should reject invalid PIN login', async () => {
    await expect(service.loginWithPin({ pinCode: '9999' })).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
