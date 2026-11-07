import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FloorPlanService } from '../services/floor-plan.service';
import { CreateVenueTableDto } from '../dtos/create-venue-table.dto';
import { UpdateVenueTableDto } from '../dtos/update-venue-table.dto';

@ApiTags('Floor Plan (Mapa de Mesas y Billares)')
@Controller('floor-plan')
export class FloorPlanController {
  constructor(private readonly floorPlanService: FloorPlanService) {}

  @Post('tables')
  @ApiOperation({ summary: 'Crea una nueva mesa de restaurante, barra o billar en el plano' })
  create(@Body() dto: CreateVenueTableDto) {
    return this.floorPlanService.create(dto);
  }

  @Get('tables')
  @ApiOperation({ summary: 'Obtiene todas las mesas del local con su estado actual en vivo' })
  findAll() {
    return this.floorPlanService.findAll();
  }

  @Get('tables/:id')
  @ApiOperation({ summary: 'Obtiene el detalle de una mesa específica' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.floorPlanService.findOne(id);
  }

  @Patch('tables/:id')
  @ApiOperation({ summary: 'Actualiza posición (Drag & Drop), estado o tarifa de una mesa' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateVenueTableDto) {
    return this.floorPlanService.update(id, dto);
  }

  @Delete('tables/:id')
  @ApiOperation({ summary: 'Elimina una mesa del plano' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.floorPlanService.remove(id);
  }
}
