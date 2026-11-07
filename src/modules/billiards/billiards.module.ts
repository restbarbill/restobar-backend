import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BilliardSession } from './entities/billiard-session.entity';
import { BilliardsController } from './controllers/billiards.controller';
import { BilliardsService } from './services/billiards.service';
import { BilliardsGateway } from './gateways/billiards.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([BilliardSession])],
  controllers: [BilliardsController],
  providers: [BilliardsService, BilliardsGateway],
  exports: [BilliardsService],
})
export class BilliardsModule {}
