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
const database_constants_1 = require("../DatabaseService/database.constants");
const department_model_1 = require("../DatabaseService/models/department.model");
const position_model_1 = require("../DatabaseService/models/position.model");
const user_project_model_1 = require("../DatabaseService/models/user_project.model");
const project_model_1 = require("../DatabaseService/models/project.model");
const user_model_mappers_1 = require("./mappers/user-model.mappers");
const Bluebird = require("bluebird");
const sequelize_1 = require("sequelize");
common_1.Injectable();
let UserService = class UserService {
    constructor(models, userModelMappers) {
        this.models = models;
        this.userModelMappers = userModelMappers;
    }
    getUserInfo(filter) {
        return this.models.UserModel.findOne({ where: filter, raw: true });
    }
    async getUserExtendedInfo(filter) {
        const user = await this.models.UserModel.findOne({
            where: filter,
            include: [
                { model: department_model_1.DepartmentModel },
                { model: position_model_1.PositionModel },
                { model: user_project_model_1.UserProjectModel, include: [project_model_1.ProjectModel] }
            ], plain: true
        });
        return this.userModelMappers.ModelToExtendedInfo(user);
    }
    async updateUserInfo(id, data) {
        await this.models.UserModel.update(data, { where: { id } });
    }
    async findUsers(search) {
        if (!search.length)
            return [];
        const users = await this.models.UserModel.findAll({
            where: {
                public_key: { [sequelize_1.Op.ne]: null }
            },
            include: [
                { model: department_model_1.DepartmentModel },
                { model: position_model_1.PositionModel },
                { model: user_project_model_1.UserProjectModel, include: [project_model_1.ProjectModel] }
            ]
        });
        const usersFormatted = await Bluebird.map(users, async (u) => await this.userModelMappers.ModelToExtendedInfo(u));
        return usersFormatted.filter(c => (c.first_name + ' ' + c.last_name).includes(search));
    }
};
UserService = __decorate([
    __param(0, common_1.Inject(database_constants_1.MODELS)),
    __metadata("design:paramtypes", [Object, user_model_mappers_1.UserModelMappers])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map