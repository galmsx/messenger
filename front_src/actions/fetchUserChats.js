export default async function(search) {
  return  fetch(`/api/chat?search=${encodeURIComponent(search)}`, {
    method: 'GET',
    headers: new Headers({ authorization: localStorage.getItem('token') }),
  }).then(res => res.json());
}
