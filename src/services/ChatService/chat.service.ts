import { Inject, Injectable } from '@nestjs/common';
import { MODELS } from '../DatabaseService/database.constants';
import { IModels } from '../DatabaseService/database.interfaces';
import { IChatInfo, ICreateGroupChat, IUserChatInfo } from './chat.interfaces';
import { ParticipantModel } from '../DatabaseService/models/participant.model';
import { UserModel } from '../DatabaseService/models/user.model';
import { MessageModel } from '../DatabaseService/models/message.model';
import { ChatModelToDataMapper } from './mappers/chatModelToData.mapper';
import * as Bluebird from 'bluebird';
import { CHAT_PARTICIPANT_TYPE, CHAT_TYPE } from './chat.constants';
import { ChatModel } from '../DatabaseService/models/chat.model';

@Injectable()
export class ChatService {
  constructor(@Inject(MODELS) private readonly models: IModels, private readonly mapper: ChatModelToDataMapper) {}

  public async createChat(participantIds: number[]): Promise<number> {
    const chat = await this.models.ChatModel.create({ type: CHAT_TYPE.REGULAR });
    await Promise.all(
      participantIds.map(p =>
        this.models.ParticipantModel.create({ user_id: p, chat_id: chat.id, roleId: CHAT_PARTICIPANT_TYPE.REGULAR }),
      ),
    );
    return chat.id;
  }

  public async createGroupChat(userId: number, payload: ICreateGroupChat): Promise<number> {
    const chat = await this.models.ChatModel.create({ type: CHAT_TYPE.GROUP, title: payload.title });
    await Promise.all(
      payload.participantIds.map(p =>
        this.models.ParticipantModel.create({
          user_id: p,
          chat_id: chat.id,
          roleId: p === userId ? CHAT_PARTICIPANT_TYPE.OWNER : CHAT_PARTICIPANT_TYPE.REGULAR,
        }),
      ),
    );
    return chat.id;
  }

  public async addMembers(chatId: number, memberIds: number[]){
    await Promise.all(memberIds.map(m =>
      this.models.ParticipantModel.create({
        user_id: m,
        chat_id : chatId,
        roleId: CHAT_PARTICIPANT_TYPE.REGULAR
      })
    ))
  }

  public async deleteChat(chatId: number, userId: number): Promise<void>{
    const chat: ChatModel = await this.models.ChatModel.findOne({where: {id: chatId}});
    if(chat.type === CHAT_TYPE.GROUP){
      this.models.ParticipantModel.destroy({where: {user_id: userId, chat_id: chatId }});
      return;
    }
    await this.models.ParticipantModel.destroy({where: {chat_id: chatId}});
    await this.models.ChatModel.destroy({where: {id: chatId}});
  }

  public async getUserChatsInfo(userId: number, search: string): Promise<IUserChatInfo[]> {
    const chats = await this.models.ChatModel.findAll({
      include: [
        {
          model: ParticipantModel,
          required: true,
          include: [{ model: UserModel, required: true, where: { id: userId } }],
        },
        {
          model: MessageModel,
          where: { receiver_id: userId },
          order: '"createdAt" DESC',
          required: false,
        },
      ],
    });
    const chatsFormatted = await Bluebird.map(chats, c => this.mapper.chatModelToUserChatInfo(c, userId));
    return this.filterChats(chatsFormatted, search);
  }

  public async getChatInfo(chatId: number): Promise<IChatInfo> {
    const chat = await this.models.ChatModel.findOne({
      where: { id: chatId },
      include: [{ model: ParticipantModel }],
    });

    return {
      id: chat.id,
      title: chat.title,
      type: chat.type,
      participantsIds: chat.participants.map(p => p.user_id),
      ownerId: chat.participants.find(p => p.roleId === CHAT_PARTICIPANT_TYPE.OWNER)?.user_id
    };
  }

  private  filterChats(chatsFormatted:IUserChatInfo[], search): IUserChatInfo[]{
    const chatsSorted = chatsFormatted.sort((a,b) =>{
      if(!a.lastMessage || !b.lastMessage) return 1;
      return  +new Date(b.lastMessage.createdAt) - +new Date(a.lastMessage.createdAt);
    });
    if (!chatsSorted.some(c => c.title.includes(search))) return chatsSorted;

    return chatsSorted.filter(c => c.title.includes(search));
  }
}
