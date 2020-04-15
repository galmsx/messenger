"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CHAT_TYPE;
(function (CHAT_TYPE) {
    CHAT_TYPE[CHAT_TYPE["REGULAR"] = 1] = "REGULAR";
    CHAT_TYPE[CHAT_TYPE["GROUP"] = 2] = "GROUP";
})(CHAT_TYPE = exports.CHAT_TYPE || (exports.CHAT_TYPE = {}));
var CHAT_PARTICIPANT_TYPE;
(function (CHAT_PARTICIPANT_TYPE) {
    CHAT_PARTICIPANT_TYPE[CHAT_PARTICIPANT_TYPE["REGULAR"] = 1] = "REGULAR";
    CHAT_PARTICIPANT_TYPE[CHAT_PARTICIPANT_TYPE["OWNER"] = 2] = "OWNER";
})(CHAT_PARTICIPANT_TYPE = exports.CHAT_PARTICIPANT_TYPE || (exports.CHAT_PARTICIPANT_TYPE = {}));
exports.CHAT_SERVICE = Symbol('CHAT_SERVICE');
exports.STANDART_GROUP_CHAT_IMAGE = 'https://pluspng.com/img-png/talk-to-a-friend-png-chat-conversation-friends-group-groupfriend-profile-talk-icon-512.png';
//# sourceMappingURL=chat.constants.js.map