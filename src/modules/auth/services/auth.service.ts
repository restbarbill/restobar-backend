import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../../users/services/users.service';
import { LoginDto, PinLoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithCredentials(dto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(dto.email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciales inválidas o cuenta inactiva');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.buildAuthResponse(user.id, user.fullName, user.email, user.role);
  }

  async loginWithPin(dto: PinLoginDto) {
    const user = await this.usersService.findByPinCode(dto.pinCode);
    if (!user) {
      throw new UnauthorizedException('PIN inválido o empleado inactivo');
    }

    return this.buildAuthResponse(user.id, user.fullName, user.email, user.role);
  }

  private buildAuthResponse(id: string, fullName: string, email: string, role: string) {
    const payload = { sub: id, email, role, fullName };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id, fullName, email, role },
    };
  }
}
