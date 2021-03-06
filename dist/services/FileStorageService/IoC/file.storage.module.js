"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const file_storage_constants_1 = require("../file-storage.constants");
const file_storage_service_1 = require("../file-storage.service");
let FileStorageModule = class FileStorageModule {
};
FileStorageModule = __decorate([
    common_1.Module({
        providers: [{ provide: file_storage_constants_1.FILE_STORAGE_SERVICE, useClass: file_storage_service_1.FileStorageService }],
        exports: [file_storage_constants_1.FILE_STORAGE_SERVICE]
    })
], FileStorageModule);
exports.FileStorageModule = FileStorageModule;
//# sourceMappingURL=file.storage.module.js.map