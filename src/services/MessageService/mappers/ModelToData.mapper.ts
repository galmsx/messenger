import { MessageModel } from '../../DatabaseService/models/message.model';
import { IExtendedMessage } from '../message.interfaces';

export class ModelToDataMapper {
  public static mapToExtendedInfo(model: MessageModel): IExtendedMessage {
    return {
      id: model.id,
      content: model.content,
      chat_id: model.chat_id,
      receiver_id: model.receiver_id,
      sender_id: model.sender_id,
      status: model.status,
      createdAt: model.createdAt,
      user: model.sender.get() as any,
      applications: model.applications.map(a => ({ link: a.link, type: a.type })),
    };
  }
}
