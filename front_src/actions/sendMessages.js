import fetchChatInfo from './fetchChatInfo';
import fetchUserInfo from './fetchUserInfo';
import encodeMessageContent from '../tools/encodeMessageContent';

export default async function(chatId, content, applications) {
  const chat = await fetchChatInfo(chatId);
  const users = await Promise.all(chat.participantsIds.map(async p => await fetchUserInfo(p)));
  const messagesPayload = createMessagesPayload(chatId, users, content, applications);
  await sendMessages(messagesPayload);
}

async function sendMessages(messages) {
  return await fetch('/api/message', {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });
}

function createMessagesPayload(chatId, users, content, applications) {
  return users.map(u => ({
    content: encodeMessageContent(content, u.public_key),
    chat_id: chatId,
    receiver_id: u.id,
    sender_id: userInfo.id,
    applications,
  }));
}
