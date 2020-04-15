import { SEQUELIZE } from '../database.constants';
import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../models/user.model';
import { PositionModel } from '../models/position.model';
import { DepartmentModel } from '../models/department.model';
import { ContactModel } from '../models/contact.model';
import { ProjectModel } from '../models/project.model';
import { UserProjectModel } from '../models/user_project.model';
import { ChatModel } from '../models/chat.model';
import { ParticipantModel } from '../models/participant.model';
import { MessageModel } from '../models/message.model';
import { ApplicationModel } from '../models/application.model';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        dialectOptions: {
          multipleStatements: true,
        },
        host: process.env.DBHOST,
        port: 3306,
        username: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        logging: false,
        define: {
          charset: 'utf8',
          collate: 'utf8_general_ci',
        },
      });
      sequelize.addModels([
        UserModel,
        PositionModel,
        DepartmentModel,
        ContactModel,
        ProjectModel,
        UserProjectModel,
        ChatModel,
        ParticipantModel,
        MessageModel,
        ApplicationModel
      ]);

      await  sequelize.sync();
      return sequelize;
    },
  },
];
