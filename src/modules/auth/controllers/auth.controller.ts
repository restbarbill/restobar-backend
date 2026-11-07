import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto, PinLoginDto } from '../dtos/login.dto';

@ApiTags('Auth (Acceso y PIN Rápido)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión con correo y contraseña' })
  login(@Body() dto: LoginDto) {
    return this.authService.loginWithCredentials(dto);
  }

  @Post('pin-login')
  @ApiOperation({ summary: 'Inicio de sesión instantáneo con PIN táctil para meseros y cajeros' })
  pinLogin(@Body() dto: PinLoginDto) {
    return this.authService.loginWithPin(dto);
  }
}
