import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenueTable } from './entities/venue-table.entity';
import { FloorPlanService } from './services/floor-plan.service';
import { FloorPlanController } from './controllers/floor-plan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VenueTable])],
  controllers: [FloorPlanController],
  providers: [FloorPlanService],
  exports: [FloorPlanService],
})
export class FloorPlanModule {}
