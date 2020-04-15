"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const database_constants_1 = require("../DatabaseService/database.constants");
const user_model_1 = require("../DatabaseService/models/user.model");
const ModelToData_mapper_1 = require("./mappers/ModelToData.mapper");
const sequelize_1 = require("sequelize");
const message_constants_1 = require("./message.constants");
const web_socket_constants_1 = require("../WebSocketsService/web.socket.constants");
const web_socket_service_1 = require("../WebSocketsService/web.socket.service");
const Bluebird = require("bluebird");
let MessageService = class MessageService {
    constructor(models, wsService) {
        this.models = models;
        this.wsService = wsService;
    }
    async updateMessages(filter, value) {
        await this.models.MessageModel.update(value, { where: filter });
    }
    async getMessagesInfo(filter) {
        return this.models.MessageModel.findAll({ where: filter, raw: true });
    }
    async getExtendedMessages(options) {
        const messages = await this.models.MessageModel.findAll({
            where: {
                chat_id: options.chat_id,
                [sequelize_1.Op.or]: [{ receiver_id: options.receiver_id }],
            },
            include: [{ model: user_model_1.UserModel, as: 'sender' }],
            order: [["createdAt", 'ASC']]
        });
        return messages.map(ModelToData_mapper_1.ModelToDataMapper.mapToExtendedInfo);
    }
    async getLastChatMessage(chat_id, receiver_id) {
        const message = await this.models.MessageModel.findOne({
            where: {
                chat_id: chat_id,
                receiver_id: receiver_id,
                createdAt: await this.models.MessageModel.max('createdAt', {
                    where: {
                        chat_id: chat_id,
                        receiver_id: receiver_id,
                    },
                }),
            },
            include: [{ model: user_model_1.UserModel, as: 'sender' }],
        });
        return message ? ModelToData_mapper_1.ModelToDataMapper.mapToExtendedInfo(message) : null;
    }
    async postMessages(messages) {
        await this.models.MessageModel.bulkCreate(messages.map(m => ({
            content: m.content,
            chat_id: m.chat_id,
            receiver_id: m.receiver_id,
            sender_id: m.sender_id,
            status: m.sender_id !== m.receiver_id ? message_constants_1.MESSAGE_STATUS.UNREAD : message_constants_1.MESSAGE_STATUS.READ,
            message_id: m.message_id,
        })));
        await Bluebird.each(messages, async (m) => this.wsService.notifyUser(m.receiver_id));
    }
};
MessageService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(database_constants_1.MODELS)),
    __param(1, common_1.Inject(web_socket_constants_1.WEB_SOCKET_SERVICE)),
    __metadata("design:paramtypes", [Object, web_socket_service_1.WebSocketService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map