import {
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import * as JWT from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { IUserExtendedInfo } from '../UserService/user.interfaces';
import { KEY_VALUE_SERVICE } from '../KeyValueService/key.value.store.constants';
import { KeyValueStoreService } from '../KeyValueService/key.value.store.service';

@WebSocketGateway()
export class WebSocketService implements OnGatewayInit, OnGatewayDisconnect {
  constructor(@Inject(KEY_VALUE_SERVICE) private readonly keyValueStore: KeyValueStoreService) {}

  @WebSocketServer()
  server: Server;

  afterInit() {}

  async handleDisconnect(client: Socket) {
    const userId = Number(await this.keyValueStore.getSting(client.id)).toString();
    await this.keyValueStore.delete(userId);
    await this.keyValueStore.delete(client.id);
    await this.keyValueStore.saveString(userId, +new Date());
  }

  @SubscribeMessage('initializeSocketMessage')
  async initializeUserSocket(client: Socket, token: string) {
    const user: IUserExtendedInfo = this.getTokenPayload(token);
    await this.keyValueStore.saveString(Number(user.id).toString(), client.id);
    await this.keyValueStore.saveString(client.id, user.id);
  }

  public async notifyUser(userId: number): Promise<void> {
    const socketId: string | number = await this.keyValueStore.getSting(Number(userId).toString());
    if (Number.isInteger(+socketId)) return;
    const socket: Socket = this.server.clients().connected[socketId];
    if (!socket) return;
    socket.emit('notifyClient');
  }

  private getTokenPayload(token: string): IUserExtendedInfo {
    try {
      const payload = JWT.verify(token, process.env.JWT_SECRET);
      if (!payload) throw new Error();
      return payload;
    } catch (e) {
      console.log(e);
      throw new WsException(e);
    }
  }
}
