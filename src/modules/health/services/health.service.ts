import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(private readonly dataSource: DataSource) {}

  async checkStatus() {
    let dbConnected = false;
    try {
      if (this.dataSource.isInitialized) {
        await this.dataSource.query('SELECT 1');
        dbConnected = true;
      }
    } catch {
      dbConnected = false;
    }

    return {
      status: dbConnected ? 'OK' : 'DEGRADED',
      service: 'restobar-backend',
      environment: process.env.NODE_ENV || 'development',
      database: dbConnected ? 'CONNECTED' : 'DISCONNECTED',
      timestamp: new Date().toISOString(),
    };
  }
}
