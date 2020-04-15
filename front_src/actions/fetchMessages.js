export default function(chatId) {
  return  fetch(`/api/chat/${chatId}/message`, {
    method: 'GET',
    headers: new Headers({ authorization: localStorage.getItem('token') }),
  }).then(res => res.json());
}
