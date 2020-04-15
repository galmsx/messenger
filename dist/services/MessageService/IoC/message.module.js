"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const databse_module_1 = require("../../DatabaseService/IoC/databse.module");
const message_service_1 = require("../message.service");
const message_constants_1 = require("../message.constants");
const web_socket_module_1 = require("../../WebSocketsService/IoC/web.socket.module");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    common_1.Module({
        imports: [databse_module_1.DatabaseModule, web_socket_module_1.WebSocketModule],
        providers: [{ provide: message_constants_1.MESSAGE_SERVICE, useClass: message_service_1.MessageService }],
        exports: [message_constants_1.MESSAGE_SERVICE]
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map