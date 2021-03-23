import { ChatModel } from '../../DatabaseService/models/chat.model';
import { IUserChatInfo } from '../chat.interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_SERVICE, MESSAGE_STATUS } from '../../MessageService/message.constants';
import { MODELS } from '../../DatabaseService/database.constants';
import { IModels } from '../../DatabaseService/database.interfaces';
import { Op } from 'sequelize';
import { UserModel } from '../../DatabaseService/models/user.model';
import { CHAT_TYPE, STANDART_GROUP_CHAT_IMAGE } from '../chat.constants';
import { MessageService } from '../../MessageService/message.service';

@Injectable()
export class ChatModelToDataMapper {
  constructor(
    @Inject(MODELS) private readonly models: IModels,
    @Inject(MESSAGE_SERVICE) private readonly messageService: MessageService,
  ) {}

  public async chatModelToUserChatInfo(model: ChatModel, userId: number): Promise<IUserChatInfo> {
    const companion: UserModel = await this.getChatCompanion(model);

    return {
      id: model.id,
      title: model.type === CHAT_TYPE.GROUP ? model.title : companion.first_name + ' ' + companion.last_name,
      type: model.type,
      unReadMessagesCount: model.messages.filter(m => m.status === MESSAGE_STATUS.UNREAD).length,
      lastMessage: await this.messageService.getLastChatMessage(model.id, userId),
      image: model.type === CHAT_TYPE.GROUP ? STANDART_GROUP_CHAT_IMAGE : companion.avatar,
    };
  }

  private getChatCompanion(chat: ChatModel): Promise<UserModel> {
    return this.models.ParticipantModel.findOne({
      where: { chat_id: chat.id, user_id: { [Op.ne]: chat.participants[0].user_id } },
      include: [{ model: UserModel }],
    }).then(p => p.user);
  }
}
