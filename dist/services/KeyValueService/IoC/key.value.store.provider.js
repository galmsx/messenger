"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_value_store_constants_1 = require("../key.value.store.constants");
const redis = require("redis");
exports.keyValueProvider = [{
        provide: key_value_store_constants_1.REDIS,
        useFactory: async () => {
            const rtg = require("url").parse(process.env.REDIS_URL);
            const client = redis.createClient(rtg.port, rtg.hostname);
            client.auth(rtg.auth.split(":")[1]);
            return client;
        }
    }];
//# sourceMappingURL=key.value.store.provider.js.map