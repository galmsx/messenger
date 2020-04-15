"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const key_value_store_constants_1 = require("../key.value.store.constants");
const key_value_store_service_1 = require("../key.value.store.service");
const key_value_store_provider_1 = require("./key.value.store.provider");
let KeyValueStoreModule = class KeyValueStoreModule {
};
KeyValueStoreModule = __decorate([
    common_1.Module({
        providers: [
            { provide: key_value_store_constants_1.KEY_VALUE_SERVICE, useClass: key_value_store_service_1.KeyValueStoreService },
            ...key_value_store_provider_1.keyValueProvider
        ],
        exports: [key_value_store_constants_1.KEY_VALUE_SERVICE]
    })
], KeyValueStoreModule);
exports.KeyValueStoreModule = KeyValueStoreModule;
//# sourceMappingURL=key.value.store.module.js.map