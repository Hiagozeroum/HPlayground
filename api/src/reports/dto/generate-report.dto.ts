import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ReportType {
  SALES = 'sales',
  USERS = 'users',
  INVENTORY = 'inventory',
}

export class GenerateReportDto {
  @ApiProperty({
    enum: ReportType,
    description: 'Tipo do relatório a ser gerado',
    example: ReportType.SALES,
  })
  @IsEnum(ReportType)
  type: ReportType;
}
