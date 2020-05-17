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
const participant_model_1 = require("../DatabaseService/models/participant.model");
const user_model_1 = require("../DatabaseService/models/user.model");
const message_model_1 = require("../DatabaseService/models/message.model");
const chatModelToData_mapper_1 = require("./mappers/chatModelToData.mapper");
const Bluebird = require("bluebird");
const chat_constants_1 = require("./chat.constants");
let ChatService = class ChatService {
    constructor(models, mapper) {
        this.models = models;
        this.mapper = mapper;
    }
    async createChat(participantIds) {
        const chat = await this.models.ChatModel.create({ type: chat_constants_1.CHAT_TYPE.REGULAR });
        await Promise.all(participantIds.map(p => this.models.ParticipantModel.create({ user_id: p, chat_id: chat.id, roleId: chat_constants_1.CHAT_PARTICIPANT_TYPE.REGULAR })));
        return chat.id;
    }
    async createGroupChat(userId, payload) {
        const chat = await this.models.ChatModel.create({ type: chat_constants_1.CHAT_TYPE.GROUP, title: payload.title });
        await Promise.all(payload.participantIds.map(p => this.models.ParticipantModel.create({
            user_id: p,
            chat_id: chat.id,
            roleId: p === userId ? chat_constants_1.CHAT_PARTICIPANT_TYPE.OWNER : chat_constants_1.CHAT_PARTICIPANT_TYPE.REGULAR,
        })));
        return chat.id;
    }
    async addMembers(chatId, memberIds) {
        await Promise.all(memberIds.map(m => this.models.ParticipantModel.create({
            user_id: m,
            chat_id: chatId,
            roleId: chat_constants_1.CHAT_PARTICIPANT_TYPE.REGULAR
        })));
    }
    async deleteChat(chatId, userId) {
        const chat = await this.models.ChatModel.findOne({ where: { id: chatId } });
        if (chat.type === chat_constants_1.CHAT_TYPE.GROUP) {
            this.models.ParticipantModel.destroy({ where: { user_id: userId, chat_id: chatId } });
            return;
        }
        await this.models.ParticipantModel.destroy({ where: { chat_id: chatId } });
        await this.models.ChatModel.destroy({ where: { id: chatId } });
    }
    async getUserChatsInfo(userId, search) {
        const chats = await this.models.ChatModel.findAll({
            include: [
                {
                    model: participant_model_1.ParticipantModel,
                    required: true,
                    include: [{ model: user_model_1.UserModel, required: true, where: { id: userId } }],
                },
                {
                    model: message_model_1.MessageModel,
                    where: { receiver_id: userId },
                    order: '"createdAt" DESC',
                    required: false,
                },
            ],
        });
        const chatsFormatted = await Bluebird.map(chats, c => this.mapper.chatModelToUserChatInfo(c, userId));
        return this.filterChats(chatsFormatted, search);
    }
    async getChatInfo(chatId) {
        var _a;
        const chat = await this.models.ChatModel.findOne({
            where: { id: chatId },
            include: [{ model: participant_model_1.ParticipantModel }],
        });
        return {
            id: chat.id,
            title: chat.title,
            type: chat.type,
            participantsIds: chat.participants.map(p => p.user_id),
            ownerId: (_a = chat.participants.find(p => p.roleId === chat_constants_1.CHAT_PARTICIPANT_TYPE.OWNER)) === null || _a === void 0 ? void 0 : _a.user_id
        };
    }
    filterChats(chatsFormatted, search) {
        const chatsSorted = chatsFormatted.sort((a, b) => {
            if (!a.lastMessage || !b.lastMessage)
                return 1;
            return +new Date(b.lastMessage.createdAt) - +new Date(a.lastMessage.createdAt);
        });
        if (!chatsSorted.some(c => c.title.includes(search)))
            return chatsSorted;
        return chatsSorted.filter(c => c.title.includes(search));
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(database_constants_1.MODELS)),
    __metadata("design:paramtypes", [Object, chatModelToData_mapper_1.ChatModelToDataMapper])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map