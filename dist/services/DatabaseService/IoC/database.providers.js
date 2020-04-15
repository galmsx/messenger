"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_constants_1 = require("../database.constants");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../models/user.model");
const position_model_1 = require("../models/position.model");
const department_model_1 = require("../models/department.model");
const contact_model_1 = require("../models/contact.model");
const project_model_1 = require("../models/project.model");
const user_project_model_1 = require("../models/user_project.model");
const chat_model_1 = require("../models/chat.model");
const participant_model_1 = require("../models/participant.model");
const message_model_1 = require("../models/message.model");
const application_model_1 = require("../models/application.model");
exports.databaseProviders = [
    {
        provide: database_constants_1.SEQUELIZE,
        useFactory: async () => {
            const sequelize = new sequelize_typescript_1.Sequelize({
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
                user_model_1.UserModel,
                position_model_1.PositionModel,
                department_model_1.DepartmentModel,
                contact_model_1.ContactModel,
                project_model_1.ProjectModel,
                user_project_model_1.UserProjectModel,
                chat_model_1.ChatModel,
                participant_model_1.ParticipantModel,
                message_model_1.MessageModel,
                application_model_1.ApplicationModel
            ]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
//# sourceMappingURL=database.providers.js.map