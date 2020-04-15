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
const usser_constants_1 = require("../usser.constants");
const user_service_1 = require("../user.service");
const user_model_mappers_1 = require("../mappers/user-model.mappers");
const key_value_store_module_1 = require("../../KeyValueService/IoC/key.value.store.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [databse_module_1.DatabaseModule, key_value_store_module_1.KeyValueStoreModule],
        providers: [{ provide: usser_constants_1.USER_SERVICE, useClass: user_service_1.UserService }, user_model_mappers_1.UserModelMappers],
        exports: [usser_constants_1.USER_SERVICE]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map