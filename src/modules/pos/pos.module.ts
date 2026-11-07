import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { PosController } from './controllers/pos.controller';
import { PosService } from './services/pos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [PosController],
  providers: [PosService],
  exports: [PosService],
})
export class PosModule {}
