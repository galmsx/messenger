export default function(id) {
  return fetch(`/api/user/${id}`, {
    method: 'GET',
    headers: new Headers({ authorization: localStorage.getItem('token') }),
  }).then(res => res.json());
}
