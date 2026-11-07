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
import { InventoryService } from '../services/inventory.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@ApiTags('Inventory (Catálogo, Recetas y Stock)')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('products')
  @ApiOperation({ summary: 'Crea un nuevo producto o insumo en el inventario' })
  create(@Body() dto: CreateProductDto) {
    return this.inventoryService.create(dto);
  }

  @Get('products')
  @ApiOperation({ summary: 'Obtiene todos los productos del catálogo' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Obtiene el detalle de un producto por UUID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryService.findOne(id);
  }

  @Patch('products/:id')
  @ApiOperation({ summary: 'Actualiza precio, stock o imagen de un producto' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProductDto) {
    return this.inventoryService.update(id, dto);
  }

  @Delete('products/:id')
  @ApiOperation({ summary: 'Elimina lógicamente un producto' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventoryService.remove(id);
  }
}
