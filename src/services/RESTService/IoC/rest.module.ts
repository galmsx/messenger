import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../DatabaseService/IoC/databse.module';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthModule } from '../../AuthService/IoC/auth.module';
import { UserModule } from '../../UserService/IoC/user.module';
import { ChatModule } from '../../ChatService/IoC/chat.module';
import { MessageModule } from '../../MessageService/IoC/message.module';
import { ChatController } from '../controllers/chat/chat.controller';
import { UserController } from '../controllers/user/user.controller';
import { KeyValueStoreModule } from '../../KeyValueService/IoC/key.value.store.module';
import { WebSocketModule } from '../../WebSocketsService/IoC/web.socket.module';
import { MessageController } from '../controllers/message/message.controller';
import { FileController } from '../controllers/file/file.controller';
import { FileStorageModule } from '../../FileStorageService/IoC/file.storage.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ChatModule,
    MessageModule,
    KeyValueStoreModule,
    WebSocketModule,
    FileStorageModule,
  ],
  controllers: [AuthController, ChatController, UserController, MessageController, FileController],
})
export class RestModule {}
