"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const fs = require("fs-extra");
const path = require("path");
let FileStorageService = class FileStorageService {
    async uploadFile(file) {
        const filename = uuid_1.v4() + file.originalname.slice(file.originalname.indexOf('.'));
        await fs.writeFile(path.join(__dirname, '../../../static/files/', filename), file.buffer);
        return '/files/' + filename;
    }
};
FileStorageService = __decorate([
    common_1.Injectable()
], FileStorageService);
exports.FileStorageService = FileStorageService;
//# sourceMappingURL=file-storage.service.js.map