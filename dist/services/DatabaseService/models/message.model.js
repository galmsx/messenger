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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const chat_model_1 = require("./chat.model");
const user_model_1 = require("./user.model");
const application_model_1 = require("./application.model");
let MessageModel = class MessageModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], MessageModel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(1000)),
    __metadata("design:type", Number)
], MessageModel.prototype, "content", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => chat_model_1.ChatModel),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], MessageModel.prototype, "chat_id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => user_model_1.UserModel),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], MessageModel.prototype, "receiver_id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => user_model_1.UserModel),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], MessageModel.prototype, "sender_id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], MessageModel.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => chat_model_1.ChatModel),
    __metadata("design:type", Number)
], MessageModel.prototype, "chat", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => user_model_1.UserModel, 'sender_id'),
    __metadata("design:type", user_model_1.UserModel)
], MessageModel.prototype, "sender", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => user_model_1.UserModel, 'receiver_id'),
    __metadata("design:type", user_model_1.UserModel)
], MessageModel.prototype, "receiver", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => application_model_1.ApplicationModel),
    __metadata("design:type", Array)
], MessageModel.prototype, "applications", void 0);
MessageModel = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'message',
        timestamps: true,
    })
], MessageModel);
exports.MessageModel = MessageModel;
//# sourceMappingURL=message.model.js.map