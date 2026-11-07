import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashShift } from './entities/cash-shift.entity';
import { CashRegisterController } from './controllers/cash-register.controller';
import { CashRegisterService } from './services/cash-register.service';

@Module({
  imports: [TypeOrmModule.forFeature([CashShift])],
  controllers: [CashRegisterController],
  providers: [CashRegisterService],
  exports: [CashRegisterService],
})
export class CashRegisterModule {}
