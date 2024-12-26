import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { wsPort } from 'src/config/ws.config';
import { Server } from 'socket.io';

@WebSocketGateway(wsPort, { cors: '*' })
export class ChatGetway {
  @WebSocketServer()
  server: Server;

  //   handleConnection(client: Socket) {
  //     console.log(client);
  //     console.log('conected');
  //   }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: string) {
    this.server.emit('onMessage', { content: body });
  }

  //   handleDisconnect(client: Socket) {
  //     console.log('disconected');
  //   }
}
