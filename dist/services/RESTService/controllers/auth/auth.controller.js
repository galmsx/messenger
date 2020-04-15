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
const auth_constants_1 = require("../../../AuthService/auth.constants");
const auth_service_1 = require("../../../AuthService/auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async redirectToKeyGeneration(code, res) {
        if (!code)
            res.redirect('/');
        res.redirect(`/#/generate_key/?code=${code}`);
    }
    async loginByGoogle(code, key) {
        const googleAuthCode = decodeURIComponent(code);
        return this.authService.loginByGoogle(googleAuthCode, key);
    }
};
__decorate([
    common_1.Get('/google'),
    __param(0, common_1.Query('code')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "redirectToKeyGeneration", null);
__decorate([
    common_1.Get('/google/login'),
    __param(0, common_1.Query('code')), __param(1, common_1.Query('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByGoogle", null);
AuthController = __decorate([
    common_1.Controller('/api/auth'),
    __param(0, common_1.Inject(auth_constants_1.AUTH_SERVICE)),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map