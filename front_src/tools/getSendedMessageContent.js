export default function(id) {
  const store = JSON.parse(localStorage.getItem('store'));
  return store[userInfo.id][id];
}
