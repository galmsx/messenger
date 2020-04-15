import { Module } from '@nestjs/common';
import { WEB_SOCKET_SERVICE } from '../web.socket.constants';
import { WebSocketService } from '../web.socket.service';
import { KeyValueStoreModule } from '../../KeyValueService/IoC/key.value.store.module';

@Module({
  imports: [KeyValueStoreModule],
  providers: [
    {
      provide: WEB_SOCKET_SERVICE,
      useClass: WebSocketService,
    },
  ],
  exports: [WEB_SOCKET_SERVICE],
})
export class WebSocketModule {}
