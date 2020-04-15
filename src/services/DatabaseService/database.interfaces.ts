import { UserModel } from './models/user.model';
import {PositionModel} from './models/position.model'
import { DepartmentModel } from './models/department.model';
import { ContactModel } from './models/contact.model';
import { ProjectModel } from './models/project.model';
import { UserProjectModel } from './models/user_project.model';
import { ChatModel } from './models/chat.model';
import { ParticipantModel } from './models/participant.model';
import { MessageModel } from './models/message.model';
import { ApplicationModel } from './models/application.model';

export interface IDatabaseService {
  transaction(cb): Promise<any>;
}

export interface IModels {
UserModel: typeof UserModel;
  PositionModel: typeof PositionModel;
  DepartmentModel: typeof DepartmentModel;
  ContactModel: typeof ContactModel;
  ProjectModel: typeof ProjectModel;
  UserProjectModel: typeof UserProjectModel;
  ChatModel: typeof ChatModel;
  ParticipantModel: typeof ParticipantModel;
  MessageModel: typeof MessageModel;
  ApplicationModel: typeof ApplicationModel;
}
