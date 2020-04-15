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
const chat_constants_1 = require("../chat.constants");
const chat_service_1 = require("../chat.service");
const chatModelToData_mapper_1 = require("../mappers/chatModelToData.mapper");
const user_module_1 = require("../../UserService/IoC/user.module");
const message_module_1 = require("../../MessageService/IoC/message.module");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    common_1.Module({
        imports: [databse_module_1.DatabaseModule, user_module_1.UserModule, message_module_1.MessageModule],
        providers: [{ provide: chat_constants_1.CHAT_SERVICE, useClass: chat_service_1.ChatService }, chatModelToData_mapper_1.ChatModelToDataMapper],
        exports: [chat_constants_1.CHAT_SERVICE]
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map