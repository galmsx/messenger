import { IUser } from '../UserService/user.interfaces';

export interface IExtendedMessage {
  id: number;
  content: number;
  chat_id: number;
  receiver_id: number;
  sender_id: number;
  status: number;
  user: IUser;
  createdAt: string;
}

export interface IPostMessage {
  content: string;
  chat_id: number;
  receiver_id: number;
  sender_id: number;
  message_id: string;
}
