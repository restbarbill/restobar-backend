import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KdsTicket } from './entities/kds-ticket.entity';
import { KdsController } from './controllers/kds.controller';
import { KdsService } from './services/kds.service';

@Module({
  imports: [TypeOrmModule.forFeature([KdsTicket])],
  controllers: [KdsController],
  providers: [KdsService],
  exports: [KdsService],
})
export class KdsModule {}
