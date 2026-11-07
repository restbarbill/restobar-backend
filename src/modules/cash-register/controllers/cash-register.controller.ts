import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CashRegisterService } from '../services/cash-register.service';
import { CloseCashShiftDto, OpenCashShiftDto } from '../dtos/open-cash-shift.dto';

@ApiTags('Cash Register (Caja y Cortes X / Z)')
@Controller('cash-register')
export class CashRegisterController {
  constructor(private readonly cashRegisterService: CashRegisterService) {}

  @Post('shifts/open')
  @ApiOperation({ summary: 'Abre un nuevo turno de caja con fondo fijo inicial' })
  openShift(@Body() dto: OpenCashShiftDto) {
    return this.cashRegisterService.openShift(dto);
  }

  @Get('shifts')
  @ApiOperation({ summary: 'Lista el historial de turnos y cortes de caja' })
  findAll() {
    return this.cashRegisterService.findAllShifts();
  }

  @Patch('shifts/:id/close')
  @ApiOperation({ summary: 'Realiza el Corte Z (cierre de turno) calculando diferencias con Decimal.js' })
  closeShift(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CloseCashShiftDto) {
    return this.cashRegisterService.closeShift(id, dto);
  }
}
