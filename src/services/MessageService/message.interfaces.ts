import { IUser } from '../UserService/user.interfaces';
import { APPLICATION_TYPE } from './message.constants';

export interface IExtendedMessage {
  id: number;
  content: number;
  chat_id: number;
  receiver_id: number;
  sender_id: number;
  status: number;
  user: IUser;
  createdAt: string;
  applications: IPostMessageApplication[]
}

export interface IPostMessage {
  content: string;
  chat_id: number;
  receiver_id: number;
  sender_id: number;
  message_id: string;
  applications: IPostMessageApplication[];
}
export interface IPostMessageApplication {
link: string;
type: APPLICATION_TYPE;
}
