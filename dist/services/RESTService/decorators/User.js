"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const JWT = require("jsonwebtoken");
exports.User = common_1.createParamDecorator((_, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.get('authorization');
    return JWT.verify(token, process.env.JWT_SECRET);
});
//# sourceMappingURL=User.js.map