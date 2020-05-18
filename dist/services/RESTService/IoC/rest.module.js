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
const auth_controller_1 = require("../controllers/auth/auth.controller");
const auth_module_1 = require("../../AuthService/IoC/auth.module");
const user_module_1 = require("../../UserService/IoC/user.module");
const chat_module_1 = require("../../ChatService/IoC/chat.module");
const message_module_1 = require("../../MessageService/IoC/message.module");
const chat_controller_1 = require("../controllers/chat/chat.controller");
const user_controller_1 = require("../controllers/user/user.controller");
const key_value_store_module_1 = require("../../KeyValueService/IoC/key.value.store.module");
const web_socket_module_1 = require("../../WebSocketsService/IoC/web.socket.module");
const message_controller_1 = require("../controllers/message/message.controller");
const file_controller_1 = require("../controllers/file/file.controller");
const file_storage_module_1 = require("../../FileStorageService/IoC/file.storage.module");
let RestModule = class RestModule {
};
RestModule = __decorate([
    common_1.Module({
        imports: [databse_module_1.DatabaseModule, auth_module_1.AuthModule, user_module_1.UserModule, chat_module_1.ChatModule, message_module_1.MessageModule, key_value_store_module_1.KeyValueStoreModule, web_socket_module_1.WebSocketModule, file_storage_module_1.FileStorageModule],
        controllers: [auth_controller_1.AuthController, chat_controller_1.ChatController, user_controller_1.UserController, message_controller_1.MessageController, file_controller_1.FileController],
    })
], RestModule);
exports.RestModule = RestModule;
//# sourceMappingURL=rest.module.js.map