import { Inject, Injectable } from '@nestjs/common';
import { IModels } from '../DatabaseService/database.interfaces';
import { MessageModel } from '../DatabaseService/models/message.model';
import { MODELS } from '../DatabaseService/database.constants';
import { IExtendedMessage, IPostMessage } from './message.interfaces';
import { UserModel } from '../DatabaseService/models/user.model';
import { ModelToDataMapper } from './mappers/ModelToData.mapper';
import { Op } from 'sequelize';
import { MESSAGE_STATUS } from './message.constants';
import { WEB_SOCKET_SERVICE } from '../WebSocketsService/web.socket.constants';
import { WebSocketService } from '../WebSocketsService/web.socket.service';
import * as Bluebird from 'bluebird';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MODELS) private readonly models: IModels,
    @Inject(WEB_SOCKET_SERVICE) private readonly wsService: WebSocketService,
  ) {}

  public async updateMessages(filter: Partial<MessageModel>, value: Partial<MessageModel>): Promise<void>{
    await this.models.MessageModel.update(value as any, {where :filter as any});
  }

  public async getMessagesInfo(filter: Partial<MessageModel>): Promise<MessageModel[]> {
    return this.models.MessageModel.findAll({ where: filter as any, raw: true });
  }

  public async getExtendedMessages(options: Partial<MessageModel>): Promise<IExtendedMessage[]> {
    const messages: MessageModel[] = await this.models.MessageModel.findAll({
      where: {
        chat_id: options.chat_id,
        [Op.or]: [{ receiver_id: options.receiver_id }],
      },
      include: [{ model: UserModel, as: 'sender' }],
      order: [["createdAt" ,'ASC']]
    });
    return messages.map(ModelToDataMapper.mapToExtendedInfo);
  }

  public async getLastChatMessage(chat_id: number, receiver_id: number): Promise<IExtendedMessage> {
    const message: MessageModel = await this.models.MessageModel.findOne({
      where: {
        chat_id: chat_id,
         receiver_id: receiver_id ,
        createdAt: await this.models.MessageModel.max('createdAt', {
          where: {
            chat_id: chat_id,
             receiver_id: receiver_id ,
          },
        }),
      },
      include: [{ model: UserModel, as: 'sender' }],
    });
    return message ? ModelToDataMapper.mapToExtendedInfo(message) : null;
  }

  public async postMessages(messages: IPostMessage[]): Promise<void> {
    await this.models.MessageModel.bulkCreate(
      messages.map(m => ({
        content: m.content,
        chat_id: m.chat_id,
        receiver_id: m.receiver_id,
        sender_id: m.sender_id,
        status: m.sender_id !== m.receiver_id ? MESSAGE_STATUS.UNREAD : MESSAGE_STATUS.READ,
        message_id: m.message_id,
      })),
    );

    await Bluebird.each(messages, async m => this.wsService.notifyUser(m.receiver_id));
  }
}
