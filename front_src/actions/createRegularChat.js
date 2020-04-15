export default async function(participantIds) {
  return await fetch('/api/chat', {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ participantIds }),
  })
    .then(r => r.json())
    .then(r => r.chatId);
}
