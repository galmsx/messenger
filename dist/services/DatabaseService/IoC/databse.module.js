"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const database_constants_1 = require("../database.constants");
const database_service_1 = require("../database.service");
const database_providers_1 = require("./database.providers");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        imports: [],
        providers: [
            { provide: database_constants_1.DATABASE_SERVICE, useClass: database_service_1.DatabaseService },
            {
                provide: database_constants_1.MODELS,
                useFactory: sequelize => {
                    return sequelize.models;
                },
                inject: [database_constants_1.SEQUELIZE],
            },
            ...database_providers_1.databaseProviders,
        ],
        exports: [{ provide: database_constants_1.DATABASE_SERVICE, useClass: database_service_1.DatabaseService }, database_constants_1.MODELS, ...database_providers_1.databaseProviders],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=databse.module.js.map