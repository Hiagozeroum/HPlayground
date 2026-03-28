import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsGateway } from './reports.gateway';

@Module({
  controllers: [ReportsController],
  // Gateway precisa ser provider para ser injetável no Service
  providers: [ReportsService, ReportsGateway],
})
export class ReportsModule {}
