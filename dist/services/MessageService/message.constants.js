"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MESSAGE_STATUS;
(function (MESSAGE_STATUS) {
    MESSAGE_STATUS[MESSAGE_STATUS["UNREAD"] = 1] = "UNREAD";
    MESSAGE_STATUS[MESSAGE_STATUS["READ"] = 2] = "READ";
})(MESSAGE_STATUS = exports.MESSAGE_STATUS || (exports.MESSAGE_STATUS = {}));
var APPLICATION_TYPE;
(function (APPLICATION_TYPE) {
    APPLICATION_TYPE[APPLICATION_TYPE["IMAGE"] = 1] = "IMAGE";
    APPLICATION_TYPE[APPLICATION_TYPE["FILE"] = 2] = "FILE";
})(APPLICATION_TYPE = exports.APPLICATION_TYPE || (exports.APPLICATION_TYPE = {}));
exports.MESSAGE_SERVICE = Symbol('MESSAGE_SERVICE');
//# sourceMappingURL=message.constants.js.map