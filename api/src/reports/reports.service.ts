import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ReportsGateway } from './reports.gateway';
import { ReportType } from './dto/generate-report.dto';

interface ReportJob {
  type: ReportType;
  status: 'pending' | 'processing' | 'done' | 'error';
  csvContent?: string;
  filename?: string;
}

interface ProcessingStep {
  progress: number;
  message: string;
}

const PROCESSING_STEPS: ProcessingStep[] = [
  { progress: 0, message: 'Iniciando processamento...' },
  { progress: 25, message: 'Coletando dados...' },
  { progress: 50, message: 'Processando registros...' },
  { progress: 75, message: 'Formatando CSV...' },
  { progress: 100, message: 'Concluído!' },
];

const STEP_DELAY_MIN_MS = 1_000;
const STEP_DELAY_MAX_MS = 3_500;

function randomDelay(): number {
  return (
    Math.floor(Math.random() * (STEP_DELAY_MAX_MS - STEP_DELAY_MIN_MS + 1)) +
    STEP_DELAY_MIN_MS
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class ReportsService {
  private readonly jobs = new Map<string, ReportJob>();

  constructor(private readonly gateway: ReportsGateway) {}

  createJob(type: ReportType): string {
    const jobId = randomUUID();
    this.jobs.set(jobId, { type, status: 'pending' });
    return jobId;
  }

  /**
   * Processa o job de forma assíncrona.
   * Chamado sem await no controller — o HTTP responde imediatamente com o jobId
   * enquanto este método continua rodando em background.
   */
  async processJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = 'processing';

    try {
      for (const step of PROCESSING_STEPS) {
        if (step.progress > 0) {
          await sleep(randomDelay());
        }

        this.gateway.emitProgress(jobId, {
          jobId,
          progress: step.progress,
          message: step.message,
        });
      }

      const { csv, filename } = this.buildCsv(job.type, jobId);
      job.csvContent = csv;
      job.filename = filename;
      job.status = 'done';

      this.gateway.emitDone(jobId, { jobId });
    } catch {
      job.status = 'error';
      this.gateway.emitError(jobId, {
        jobId,
        message: 'Erro interno ao gerar o relatório.',
      });
    }
  }

  getJobCsv(jobId: string): { csv: string; filename: string } {
    const job = this.jobs.get(jobId);

    if (!job || job.status !== 'done' || !job.csvContent || !job.filename) {
      throw new NotFoundException(
        `Relatório ${jobId} não encontrado ou ainda não concluído.`,
      );
    }

    return { csv: job.csvContent, filename: job.filename };
  }

  private buildCsv(
    type: ReportType,
    jobId: string,
  ): { csv: string; filename: string } {
    const rows: string[][] = [];

    if (type === ReportType.SALES) {
      rows.push(['data', 'produto', 'quantidade', 'valor_total']);
      const products = ['Notebook', 'Mouse', 'Teclado', 'Monitor', 'Headset'];
      for (let i = 0; i < 10; i++) {
        const qty = Math.floor(Math.random() * 50) + 1;
        const unitPrice = Math.random() * 2_000 + 100;
        rows.push([
          new Date(Date.now() - i * 86_400_000).toLocaleDateString('pt-BR'),
          products[i % products.length],
          String(qty),
          (qty * unitPrice).toFixed(2),
        ]);
      }
    } else if (type === ReportType.USERS) {
      rows.push(['id', 'nome', 'email', 'data_cadastro']);
      const names = [
        'Ana Silva', 'Bruno Costa', 'Carla Lima', 'Diego Souza', 'Eva Martins',
        'Felipe Rocha', 'Gabriela Nunes', 'Henrique Dias', 'Isabela Castro', 'João Ferreira',
      ];
      for (let i = 0; i < names.length; i++) {
        const slug = names[i].toLowerCase().replace(' ', '.');
        rows.push([
          String(i + 1),
          names[i],
          `${slug}@email.com`,
          new Date(Date.now() - i * 7 * 86_400_000).toLocaleDateString('pt-BR'),
        ]);
      }
    } else {
      rows.push(['sku', 'produto', 'estoque_atual', 'estoque_minimo']);
      const items = [
        ['SKU-001', 'Caneta'], ['SKU-002', 'Papel A4'], ['SKU-003', 'Grampeador'],
        ['SKU-004', 'Tesoura'], ['SKU-005', 'Régua'], ['SKU-006', 'Borracha'],
        ['SKU-007', 'Lápis'], ['SKU-008', 'Caderno'], ['SKU-009', 'Pasta'], ['SKU-010', 'Clipe'],
      ];
      for (const [sku, produto] of items) {
        rows.push([
          sku,
          produto,
          String(Math.floor(Math.random() * 200)),
          String(Math.floor(Math.random() * 20) + 5),
        ]);
      }
    }

    const csv = rows.map((row) => row.join(',')).join('\n');
    const filename = `relatorio-${type}-${jobId.slice(0, 8)}.csv`;
    return { csv, filename };
  }
}
