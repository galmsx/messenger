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
const project_model_1 = require("./project.model");
const user_model_1 = require("./user.model");
let UserProjectModel = class UserProjectModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.ForeignKey(() => user_model_1.UserModel),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], UserProjectModel.prototype, "user_id", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.ForeignKey(() => project_model_1.ProjectModel),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], UserProjectModel.prototype, "project_id", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => user_model_1.UserModel),
    __metadata("design:type", user_model_1.UserModel)
], UserProjectModel.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => project_model_1.ProjectModel),
    __metadata("design:type", project_model_1.ProjectModel)
], UserProjectModel.prototype, "project", void 0);
UserProjectModel = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'user_project',
        timestamps: false,
    })
], UserProjectModel);
exports.UserProjectModel = UserProjectModel;
//# sourceMappingURL=user_project.model.js.map