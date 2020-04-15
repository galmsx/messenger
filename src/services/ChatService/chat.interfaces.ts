import { CHAT_TYPE } from './chat.constants';
import { IExtendedMessage } from '../MessageService/message.interfaces';

export interface IUserChatInfo {
id: number;
title: string;
type: CHAT_TYPE;
unReadMessagesCount: number;
lastMessage: IExtendedMessage;
image: string;
}

export interface IChatInfo {
  id: number;
  title: string;
  type: CHAT_TYPE;
  participantsIds: number[];
  ownerId?: number;
}

export interface ICreateChat {
  participantIds: number[]
}
export interface ICreateGroupChat extends ICreateChat{
  title: string;
}

