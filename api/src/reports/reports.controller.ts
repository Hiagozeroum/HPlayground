import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GenerateReportDto } from './dto/generate-report.dto';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('generate')
  @ApiOperation({
    summary: 'Solicita a geração de um relatório CSV',
    description:
      'Retorna imediatamente com um jobId. Conecte-se via WebSocket ' +
      "e entre na room do jobId para receber eventos 'report:progress' e 'report:done'.",
  })
  @ApiResponse({
    status: 201,
    description: 'Geração iniciada com sucesso.',
    schema: { example: { jobId: 'uuid-aqui' } },
  })
  generateReport(@Body() dto: GenerateReportDto): { jobId: string } {
    const jobId = this.reportsService.createJob(dto.type);

    // Inicia o processamento em background — sem await intencional.
    // O HTTP responde imediatamente; o progresso chega via WebSocket.
    void this.reportsService.processJob(jobId);

    return { jobId };
  }

  @Get('download/:jobId')
  @ApiOperation({
    summary: 'Faz o download do CSV gerado',
    description: "Disponível apenas após receber o evento 'report:done' via WebSocket.",
  })
  @ApiResponse({ status: 200, description: 'Arquivo CSV para download.' })
  @ApiResponse({
    status: 404,
    description: 'Relatório não encontrado ou ainda não concluído.',
  })
  downloadReport(
    @Param('jobId') jobId: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const { csv, filename } = this.reportsService.getJobCsv(jobId);

    res.set({
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(Buffer.from(csv, 'utf-8'));
  }
}
