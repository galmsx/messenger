import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CHAT_SERVICE } from '../../../ChatService/chat.constants';
import { ChatService } from '../../../ChatService/chat.service';
import { AuthGuard } from '../../guards/AuthGuard';
import { IChatInfo, ICreateChat, ICreateGroupChat, IUserChatInfo } from '../../../ChatService/chat.interfaces';
import { User } from '../../decorators/User';
import { IUserExtendedInfo } from '../../../UserService/user.interfaces';
import { MESSAGE_SERVICE, MESSAGE_STATUS } from '../../../MessageService/message.constants';
import { MessageService } from '../../../MessageService/message.service';
import { IExtendedMessage } from '../../../MessageService/message.interfaces';

@Controller('/api/chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(
    @Inject(CHAT_SERVICE) private readonly chatService: ChatService,
    @Inject(MESSAGE_SERVICE) private readonly messageService: MessageService,
  ) {}

  @Get()
  public async getChats(@User() user: IUserExtendedInfo, @Query('search') search: string): Promise<IUserChatInfo[]> {
    const chats = await this.chatService.getUserChatsInfo(user.id, search);
    return this.mapChatsToPresentation(chats);
  }

  @Post()
  public async createChat(@Body() payload: ICreateChat): Promise<{ chatId: number }> {
    const chatId = await this.chatService.createChat(payload.participantIds);
    return { chatId };
  }

  @Post('/group')
  public async createGroupChat(
    @Body() payload: ICreateGroupChat,
    @User() user: IUserExtendedInfo,
  ): Promise<{ chatId: number }> {
    const chatId = await this.chatService.createGroupChat(user.id, payload);
    return { chatId };
  }

  @Get('/:id')
  public async getChat(@Param('id') chatId: number): Promise<IChatInfo> {
    return this.chatService.getChatInfo(chatId);
  }

  @Patch('/:id/read-messages')
  public async readMessages(@Param('id') chatId: number, @User() user: IUserExtendedInfo): Promise<void> {
    await this.messageService.updateMessages(
      { receiver_id: user.id, chat_id: chatId },
      { status: MESSAGE_STATUS.READ },
    );
  }
  @Post(':id/members')
  public async addMembers(@Param('id') chatId: number, @Body() { memberIds }: { memberIds: number[] }): Promise<void> {
    await this.chatService.addMembers(chatId, memberIds);
  }

  @Delete('/:id')
  public async deleteChat(@Param('id') chatId: number, @User() user: IUserExtendedInfo): Promise<void> {
    await this.chatService.deleteChat(chatId, user.id);
  }

  @Get('/:id/message')
  public async getChatMessages(
    @User() user: IUserExtendedInfo,
    @Param('id') chatId: number,
  ): Promise<IExtendedMessage[]> {
    return this.messageService.getExtendedMessages({ chat_id: chatId, receiver_id: user.id });
  }

  private mapChatsToPresentation(chats: IUserChatInfo[]): IUserChatInfo[] {
    return chats;
  }
}
