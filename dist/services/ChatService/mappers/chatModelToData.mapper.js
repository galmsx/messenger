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
const message_constants_1 = require("../../MessageService/message.constants");
const database_constants_1 = require("../../DatabaseService/database.constants");
const sequelize_1 = require("sequelize");
const user_model_1 = require("../../DatabaseService/models/user.model");
const chat_constants_1 = require("../chat.constants");
const message_service_1 = require("../../MessageService/message.service");
let ChatModelToDataMapper = class ChatModelToDataMapper {
    constructor(models, messageService) {
        this.models = models;
        this.messageService = messageService;
    }
    async chatModelToUserChatInfo(model, userId) {
        const companion = await this.getChatCompanion(model);
        return {
            id: model.id,
            title: model.type === chat_constants_1.CHAT_TYPE.GROUP ? model.title : companion.first_name + ' ' + companion.last_name,
            type: model.type,
            unReadMessagesCount: model.messages.filter(m => m.status === message_constants_1.MESSAGE_STATUS.UNREAD).length,
            lastMessage: await this.messageService.getLastChatMessage(model.id, userId),
            image: model.type === chat_constants_1.CHAT_TYPE.GROUP ? chat_constants_1.STANDART_GROUP_CHAT_IMAGE : companion.avatar,
        };
    }
    getChatCompanion(chat) {
        return this.models.ParticipantModel.findOne({
            where: { chat_id: chat.id, user_id: { [sequelize_1.Op.ne]: chat.participants[0].user_id } },
            include: [{ model: user_model_1.UserModel }],
        }).then(p => p.user);
    }
};
ChatModelToDataMapper = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(database_constants_1.MODELS)),
    __param(1, common_1.Inject(message_constants_1.MESSAGE_SERVICE)),
    __metadata("design:paramtypes", [Object, message_service_1.MessageService])
], ChatModelToDataMapper);
exports.ChatModelToDataMapper = ChatModelToDataMapper;
//# sourceMappingURL=chatModelToData.mapper.js.map