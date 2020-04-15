export default function(id) {
  return fetch(`/api/chat/${id}/read-messages`, {
    method: 'PATCH',
    headers: {
      authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: '{}'
  });
}
