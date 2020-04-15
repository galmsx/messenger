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
const position_model_1 = require("./position.model");
const department_model_1 = require("./department.model");
const contact_model_1 = require("./contact.model");
const user_project_model_1 = require("./user_project.model");
const participant_model_1 = require("./participant.model");
const message_model_1 = require("./message.model");
let UserModel = class UserModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], UserModel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], UserModel.prototype, "first_name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], UserModel.prototype, "last_name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(150)),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(500)),
    __metadata("design:type", String)
], UserModel.prototype, "public_key", void 0);
__decorate([
    sequelize_typescript_1.Default('https://ptetutorials.com/images/user-profile.png'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(300)),
    __metadata("design:type", String)
], UserModel.prototype, "avatar", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => department_model_1.DepartmentModel),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], UserModel.prototype, "department_id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => position_model_1.PositionModel),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], UserModel.prototype, "position_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => position_model_1.PositionModel),
    __metadata("design:type", position_model_1.PositionModel)
], UserModel.prototype, "position", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => department_model_1.DepartmentModel),
    __metadata("design:type", department_model_1.DepartmentModel)
], UserModel.prototype, "department", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => contact_model_1.ContactModel),
    __metadata("design:type", Array)
], UserModel.prototype, "contacts", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => user_project_model_1.UserProjectModel),
    __metadata("design:type", Array)
], UserModel.prototype, "user_project", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => participant_model_1.ParticipantModel),
    __metadata("design:type", Array)
], UserModel.prototype, "participants", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => message_model_1.MessageModel, 'sender_id'),
    __metadata("design:type", Array)
], UserModel.prototype, "sent_messages", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => message_model_1.MessageModel, 'receiver_id'),
    __metadata("design:type", Array)
], UserModel.prototype, "received_messages", void 0);
UserModel = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'user',
        timestamps: false,
    })
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map