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
const fetch = require("node-fetch");
const usser_constants_1 = require("../UserService/usser.constants");
const user_service_1 = require("../UserService/user.service");
const JWT = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async loginByGoogle(code, key) {
        const googleAccessToken = await this.getGoogleAccessToken(code);
        const email = await this.getUserEmail(googleAccessToken);
        const user = await this.userService.getUserExtendedInfo({ email });
        if (!user) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        const token = this.generateToken(user);
        await this.userService.updateUserInfo(user.id, { public_key: key });
        return { token };
    }
    generateToken(user) {
        return JWT.sign(Object.assign({}, user), process.env.JWT_SECRET, { expiresIn: '30d' });
    }
    async getGoogleAccessToken(code) {
        const res = await fetch('https://accounts.google.com/o/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`,
        }).then(r => r.json());
        return res.access_token;
    }
    async getUserEmail(accessToken) {
        const userInfo = await (await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`)).json();
        return userInfo.email;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(usser_constants_1.USER_SERVICE)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map