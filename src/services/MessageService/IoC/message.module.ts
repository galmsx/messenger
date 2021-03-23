import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../DatabaseService/IoC/databse.module';
import { MessageService } from '../message.service';
import { MESSAGE_SERVICE } from '../message.constants';
import { WebSocketModule } from '../../WebSocketsService/IoC/web.socket.module';

@Module({
  imports: [DatabaseModule, WebSocketModule],
  providers: [{ provide: MESSAGE_SERVICE, useClass: MessageService }],
  exports: [MESSAGE_SERVICE],
})
export class MessageModule {}
