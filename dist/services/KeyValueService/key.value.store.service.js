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
const key_value_store_constants_1 = require("./key.value.store.constants");
const redis_1 = require("redis");
let KeyValueStoreService = class KeyValueStoreService {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async saveString(key, value) {
        return new Promise((res, rej) => {
            this.redisClient.set(key, value, e => {
                if (e)
                    rej();
                else
                    res();
            });
        });
    }
    async getSting(key) {
        return new Promise((res) => {
            this.redisClient.get(key, (e, v) => {
                if (e)
                    console.log(e);
                res(v);
            });
        });
    }
    async delete(key) {
        return new Promise((res, rej) => {
            this.redisClient.del(key, e => {
                if (e)
                    rej(e);
                else
                    res();
            });
        });
    }
};
KeyValueStoreService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(key_value_store_constants_1.REDIS)),
    __metadata("design:paramtypes", [redis_1.RedisClient])
], KeyValueStoreService);
exports.KeyValueStoreService = KeyValueStoreService;
//# sourceMappingURL=key.value.store.service.js.map