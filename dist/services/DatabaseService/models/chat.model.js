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
const participant_model_1 = require("./participant.model");
const message_model_1 = require("./message.model");
let ChatModel = class ChatModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], ChatModel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], ChatModel.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], ChatModel.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => participant_model_1.ParticipantModel),
    __metadata("design:type", Array)
], ChatModel.prototype, "participants", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => message_model_1.MessageModel),
    __metadata("design:type", Array)
], ChatModel.prototype, "messages", void 0);
ChatModel = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'chat',
        timestamps: false,
    })
], ChatModel);
exports.ChatModel = ChatModel;
//# sourceMappingURL=chat.model.js.map