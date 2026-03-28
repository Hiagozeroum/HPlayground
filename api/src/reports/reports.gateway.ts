import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

export interface ProgressPayload {
  jobId: string;
  progress: number;
  message: string;
}

export interface DonePayload {
  jobId: string;
}

export interface ErrorPayload {
  jobId: string;
  message: string;
}

@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' },
})
export class ReportsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  private readonly logger = new Logger(ReportsGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  /**
   * O cliente entra na room do job específico para receber
   * apenas os eventos daquele relatório.
   * Retorna um ACK confirmando a entrada.
   */
  @SubscribeMessage('join-report')
  handleJoinReport(
    @MessageBody() jobId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const room = `report:${jobId}`;
    client.join(room);
    this.logger.log(`Cliente ${client.id} entrou na room ${room}`);
    return { joined: true, room };
  }

  emitProgress(jobId: string, payload: ProgressPayload): void {
    this.server.to(`report:${jobId}`).emit('report:progress', payload);
  }

  emitDone(jobId: string, payload: DonePayload): void {
    this.server.to(`report:${jobId}`).emit('report:done', payload);
  }

  emitError(jobId: string, payload: ErrorPayload): void {
    this.server.to(`report:${jobId}`).emit('report:error', payload);
  }
}
