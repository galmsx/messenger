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
const websockets_1 = require("@nestjs/websockets");
const JWT = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const key_value_store_constants_1 = require("../KeyValueService/key.value.store.constants");
const key_value_store_service_1 = require("../KeyValueService/key.value.store.service");
let WebSocketService = class WebSocketService {
    constructor(keyValueStore) {
        this.keyValueStore = keyValueStore;
    }
    afterInit() { }
    async handleDisconnect(client) {
        const userId = Number(await this.keyValueStore.getSting(client.id)).toString();
        await this.keyValueStore.delete(userId);
        await this.keyValueStore.delete(client.id);
        await this.keyValueStore.saveString(userId, +new Date());
    }
    async initializeUserSocket(client, token) {
        const user = this.getTokenPayload(token);
        await this.keyValueStore.saveString(Number(user.id).toString(), client.id);
        await this.keyValueStore.saveString(client.id, user.id);
    }
    async notifyUser(userId) {
        const socketId = await this.keyValueStore.getSting(Number(userId).toString());
        if (Number.isInteger(+socketId))
            return;
        const socket = this.server.clients().connected[socketId];
        if (!socket)
            return;
        socket.emit('notifyClient');
    }
    getTokenPayload(token) {
        try {
            const payload = JWT.verify(token, process.env.JWT_SECRET);
            if (!payload)
                throw new Error();
            return payload;
        }
        catch (e) {
            console.log(e);
            throw new websockets_1.WsException(e);
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], WebSocketService.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('initializeSocketMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WebSocketService.prototype, "initializeUserSocket", null);
WebSocketService = __decorate([
    websockets_1.WebSocketGateway(),
    __param(0, common_1.Inject(key_value_store_constants_1.KEY_VALUE_SERVICE)),
    __metadata("design:paramtypes", [key_value_store_service_1.KeyValueStoreService])
], WebSocketService);
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=web.socket.service.js.map