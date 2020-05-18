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
const AuthGuard_1 = require("../../guards/AuthGuard");
const platform_express_1 = require("@nestjs/platform-express");
const file_storage_constants_1 = require("../../../FileStorageService/file-storage.constants");
const file_storage_service_1 = require("../../../FileStorageService/file-storage.service");
let FileController = class FileController {
    constructor(fileStorageService) {
        this.fileStorageService = fileStorageService;
    }
    async uploadFile(file) {
        const link = await this.fileStorageService.uploadFile(file);
        return { link };
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "uploadFile", null);
FileController = __decorate([
    common_1.Controller('/api/file'),
    common_1.UseGuards(AuthGuard_1.AuthGuard),
    __param(0, common_1.Inject(file_storage_constants_1.FILE_STORAGE_SERVICE)),
    __metadata("design:paramtypes", [file_storage_service_1.FileStorageService])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map