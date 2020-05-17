export default async function(chatId, memberIds) {
  return await fetch(`/api/chat/${chatId}/members`, {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ memberIds }),
  })
}
