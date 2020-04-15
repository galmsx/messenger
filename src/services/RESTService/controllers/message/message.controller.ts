import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/AuthGuard';
import { MESSAGE_SERVICE } from '../../../MessageService/message.constants';
import { MessageService } from '../../../MessageService/message.service';
import { IPostChatMessages } from './message.contracts';

@Controller('/api/message')
@UseGuards(AuthGuard)
export class MessageController {
  constructor(@Inject(MESSAGE_SERVICE) private readonly messageService: MessageService) {}

  @Post('')
  public async postMessage(@Body() body: IPostChatMessages): Promise<void> {
    return this.messageService.postMessages(body.messages);
  }
}
