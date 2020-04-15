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
const user_project_model_1 = require("./user_project.model");
let ProjectModel = class ProjectModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.BIGINT.UNSIGNED),
    __metadata("design:type", Number)
], ProjectModel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], ProjectModel.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => user_project_model_1.UserProjectModel),
    __metadata("design:type", Array)
], ProjectModel.prototype, "user_project", void 0);
ProjectModel = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'project',
        timestamps: false,
    })
], ProjectModel);
exports.ProjectModel = ProjectModel;
//# sourceMappingURL=project.model.js.map