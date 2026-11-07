import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BilliardsService } from '../services/billiards.service';
import { StartBilliardSessionDto } from '../dtos/start-billiard-session.dto';

@ApiTags('Billiards (Control de Tiempo y Mesas de Billar)')
@Controller('billiards')
export class BilliardsController {
  constructor(private readonly billiardsService: BilliardsService) {}

  @Post('sessions/start')
  @ApiOperation({ summary: 'Inicia el cronómetro en vivo para una mesa de billar' })
  startSession(@Body() dto: StartBilliardSessionDto) {
    return this.billiardsService.startSession(dto);
  }

  @Get('sessions/active')
  @ApiOperation({ summary: 'Obtiene todas las sesiones de billar activas en este momento' })
  findAllActive() {
    return this.billiardsService.findAllActive();
  }

  @Patch('sessions/:id/stop')
  @ApiOperation({ summary: 'Detiene el reloj y calcula el cobro exacto con Decimal.js' })
  stopSession(@Param('id', ParseUUIDPipe) id: string) {
    return this.billiardsService.stopAndCalculateSession(id);
  }
}
