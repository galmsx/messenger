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
const key_value_store_constants_1 = require("../../KeyValueService/key.value.store.constants");
const key_value_store_service_1 = require("../../KeyValueService/key.value.store.service");
let UserModelMappers = class UserModelMappers {
    constructor(keyValue) {
        this.keyValue = keyValue;
    }
    ;
    async ModelToExtendedInfo(model) {
        const socketId = await this.keyValue.getSting(Number(model.id).toString());
        return {
            id: model.id,
            first_name: model.first_name,
            last_name: model.last_name,
            email: model.email,
            department: model.department.get(),
            projects: model.user_project.map(up => up.project.get()),
            position: model.position.get(),
            avatar: model.avatar,
            public_key: model.public_key,
            department_id: model.department_id,
            position_id: model.position_id,
            socketId: socketId,
        };
    }
};
UserModelMappers = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(key_value_store_constants_1.KEY_VALUE_SERVICE)),
    __metadata("design:paramtypes", [key_value_store_service_1.KeyValueStoreService])
], UserModelMappers);
exports.UserModelMappers = UserModelMappers;
//# sourceMappingURL=user-model.mappers.js.map