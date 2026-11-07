import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './modules/health/health.module';
import { MediaModule } from './modules/media/media.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FloorPlanModule } from './modules/floor-plan/floor-plan.module';
import { BilliardsModule } from './modules/billiards/billiards.module';
import { TournamentModule } from './modules/tournament/tournament.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { PosModule } from './modules/pos/pos.module';
import { CashRegisterModule } from './modules/cash-register/cash-register.module';
import { KdsModule } from './modules/kds/kds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isSsl = config.get<string>('DB_SSL') === 'true';
        const isProd = config.get<string>('NODE_ENV') === 'production';
        const sync = config.get<string>('DB_SYNCHRONIZE') === 'true' && !isProd;

        return {
          type: 'postgres',
          url: config.get<string>('DATABASE_URL'),
          ssl: isSsl ? { rejectUnauthorized: false } : false,
          autoLoadEntities: true,
          synchronize: sync,
          logging: !isProd ? ['error', 'warn'] : ['error'],
        };
      },
    }),
    HealthModule,
    MediaModule,
    UsersModule,
    AuthModule,
    FloorPlanModule,
    BilliardsModule,
    TournamentModule,
    InventoryModule,
    PosModule,
    CashRegisterModule,
    KdsModule,
  ],
})
export class AppModule {}
