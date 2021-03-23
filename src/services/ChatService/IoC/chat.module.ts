import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../DatabaseService/IoC/databse.module';
import { CHAT_SERVICE } from '../chat.constants';
import { ChatService } from '../chat.service';
import { ChatModelToDataMapper } from '../mappers/chatModelToData.mapper';
import { UserModule } from '../../UserService/IoC/user.module';
import { MessageModule } from '../../MessageService/IoC/message.module';

@Module({
  imports: [DatabaseModule, UserModule, MessageModule],
  providers: [{ provide: CHAT_SERVICE, useClass: ChatService }, ChatModelToDataMapper],
  exports: [CHAT_SERVICE],
})
export class ChatModule {}
