export default async function(chatId) {
  return await fetch(`/api/chat/${chatId}`, {
    method: 'DELETE',
    headers: {
      authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    }
  })
}
