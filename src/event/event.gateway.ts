import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtAccessTokenPayload } from 'src/auth/type/jwt-access-token-payload.type';
import { wsPort } from 'src/config/ws.config';

@WebSocketGateway(wsPort, {
  cors: { origin: '*' },
})
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private jwtService: JwtService) {}

  @WebSocketServer()
  public server: Server;

  async handleConnection(client: Socket) {
    Logger.verbose('connect', client.id);

    const token = client.handshake.auth?.token;

    try {
      const payload: JwtAccessTokenPayload =
        await this.jwtService.verifyAsync(token);

      client.join(payload.userId.toString());
    } catch (err) {
      Logger.error('error', client.id, err);

      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    Logger.verbose('disconnect', client.id);
  }
}
