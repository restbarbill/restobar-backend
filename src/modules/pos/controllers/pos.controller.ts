import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PosService } from '../services/pos.service';
import { CreateOrderDto } from '../dtos/create-order.dto';

@ApiTags('POS (Punto de Venta y Comandas)')
@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Post('orders')
  @ApiOperation({ summary: 'Abre una nueva comanda o cuenta unificada (Billar + Bar + Cocina)' })
  create(@Body() dto: CreateOrderDto) {
    return this.posService.createOrder(dto);
  }

  @Get('orders/open')
  @ApiOperation({ summary: 'Lista todas las comandas abiertas en este momento' })
  findAllOpen() {
    return this.posService.findAllOpen();
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Obtiene el detalle de una comanda por su UUID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.posService.findOne(id);
  }
}
