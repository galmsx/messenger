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
const message_model_1 = require("./message.model");
let ApplicationModel = class ApplicationModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.ForeignKey(() => message_model_1.MessageModel),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], ApplicationModel.prototype, "message_id", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], ApplicationModel.prototype, "link", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", Number)
], ApplicationModel.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => message_model_1.MessageModel),
    __metadata("design:type", message_model_1.MessageModel)
], ApplicationModel.prototype, "message", void 0);
ApplicationModel = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'application',
        timestamps: false,
    })
], ApplicationModel);
exports.ApplicationModel = ApplicationModel;
//# sourceMappingURL=application.model.js.map