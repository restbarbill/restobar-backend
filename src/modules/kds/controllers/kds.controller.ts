import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { KdsService } from '../services/kds.service';
import { CreateKdsTicketDto, UpdateKdsStatusDto } from '../dtos/create-kds-ticket.dto';
import { KdsStation } from '../entities/kds-ticket.entity';

@ApiTags('KDS (Pantallas de Cocina y Barra)')
@Controller('kds')
export class KdsController {
  constructor(private readonly kdsService: KdsService) {}

  @Post('tickets')
  @ApiOperation({ summary: 'Envía una comanda a la pantalla de Cocina o Barra' })
  create(@Body() dto: CreateKdsTicketDto) {
    return this.kdsService.createTicket(dto);
  }

  @Get('tickets')
  @ApiOperation({ summary: 'Lista las comandas en preparación filtradas por estación (KITCHEN | BAR)' })
  findAll(@Query('station') station?: KdsStation) {
    return this.kdsService.findActiveByStation(station);
  }

  @Patch('tickets/:id/status')
  @ApiOperation({ summary: 'Actualiza el estado de preparación (PREPARING | READY | DELIVERED)' })
  updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateKdsStatusDto) {
    return this.kdsService.updateStatus(id, dto);
  }
}
