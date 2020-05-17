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
const chat_constants_1 = require("../../../ChatService/chat.constants");
const chat_service_1 = require("../../../ChatService/chat.service");
const AuthGuard_1 = require("../../guards/AuthGuard");
const User_1 = require("../../decorators/User");
const message_constants_1 = require("../../../MessageService/message.constants");
const message_service_1 = require("../../../MessageService/message.service");
let ChatController = class ChatController {
    constructor(chatService, messageService) {
        this.chatService = chatService;
        this.messageService = messageService;
    }
    async getChats(user, search) {
        const chats = await this.chatService.getUserChatsInfo(user.id, search);
        return this.mapChatsToPresentation(chats);
    }
    async createChat(payload) {
        const chatId = await this.chatService.createChat(payload.participantIds);
        return { chatId };
    }
    async createGroupChat(payload, user) {
        const chatId = await this.chatService.createGroupChat(user.id, payload);
        return { chatId };
    }
    async getChat(chatId) {
        return this.chatService.getChatInfo(chatId);
    }
    async readMessages(chatId, user) {
        await this.messageService.updateMessages({ receiver_id: user.id, chat_id: chatId }, { status: message_constants_1.MESSAGE_STATUS.READ });
    }
    async addMembers(chatId, { memberIds }) {
        await this.chatService.addMembers(chatId, memberIds);
    }
    async deleteChat(chatId, user) {
        await this.chatService.deleteChat(chatId, user.id);
    }
    async getChatMessages(user, chatId) {
        return this.messageService.getExtendedMessages({ chat_id: chatId, receiver_id: user.id });
    }
    mapChatsToPresentation(chats) {
        return chats;
    }
};
__decorate([
    common_1.Get(),
    __param(0, User_1.User()), __param(1, common_1.Query('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChats", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createChat", null);
__decorate([
    common_1.Post('/group'),
    __param(0, common_1.Body()), __param(1, User_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "createGroupChat", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChat", null);
__decorate([
    common_1.Patch('/:id/read-messages'),
    __param(0, common_1.Param('id')), __param(1, User_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "readMessages", null);
__decorate([
    common_1.Post(':id/members'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "addMembers", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')), __param(1, User_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "deleteChat", null);
__decorate([
    common_1.Get('/:id/message'),
    __param(0, User_1.User()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChatMessages", null);
ChatController = __decorate([
    common_1.Controller('/api/chat'),
    common_1.UseGuards(AuthGuard_1.AuthGuard),
    __param(0, common_1.Inject(chat_constants_1.CHAT_SERVICE)),
    __param(1, common_1.Inject(message_constants_1.MESSAGE_SERVICE)),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        message_service_1.MessageService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map