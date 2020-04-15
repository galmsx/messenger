export default async function(participantIds, title) {
  return await fetch('/api/chat/group', {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ participantIds, title }),
  })
    .then(r => r.json())
    .then(r => r.chatId);
}
