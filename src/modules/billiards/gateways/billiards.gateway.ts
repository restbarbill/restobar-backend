import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BilliardSession } from '../entities/billiard-session.entity';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/billiards',
})
export class BilliardsGateway {
  @WebSocketServer()
  server: Server;

  emitSessionUpdated(session: BilliardSession) {
    if (this.server) {
      this.server.emit('billiard:session-updated', session);
    }
  }
}
