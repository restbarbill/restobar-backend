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
import { TournamentService } from '../services/tournament.service';
import { CreateTournamentDto } from '../dtos/create-tournament.dto';
import { UpdateTournamentDto } from '../dtos/update-tournament.dto';

@ApiTags('Tournament (Torneos de Billar)')
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo torneo de billar en PostgreSQL' })
  create(@Body() dto: CreateTournamentDto) {
    return this.tournamentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos los torneos registrados en la base de datos' })
  findAll() {
    return this.tournamentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene el detalle de un torneo por UUID' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualiza datos o estado de un torneo' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateTournamentDto) {
    return this.tournamentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina lógicamente un torneo' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.remove(id);
  }
}
