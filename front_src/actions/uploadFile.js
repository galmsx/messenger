export default async function(file) {
  const formData = new FormData();
  formData.append('file', file.files[0]);

  return await fetch(`/api/file`, {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem('token'),
    },
    body: formData,
  }).then(r =>r.json()).then(r => r.link);
}
