"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelToDataMapper {
    static mapToExtendedInfo(model) {
        return {
            id: model.id,
            content: model.content,
            chat_id: model.chat_id,
            receiver_id: model.receiver_id,
            sender_id: model.sender_id,
            status: model.status,
            createdAt: model.createdAt,
            user: model.sender.get(),
            applications: model.applications.map(a => ({ link: a.link, type: a.type }))
        };
    }
}
exports.ModelToDataMapper = ModelToDataMapper;
//# sourceMappingURL=ModelToData.mapper.js.map