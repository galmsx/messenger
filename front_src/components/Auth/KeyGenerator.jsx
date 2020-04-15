import React from 'react';
import generatePublicKey from '../../tools/generatePublicKey';
import getQueryParam from '../../tools/getQueryParam';
import saveJwt from '../../tools/saveJwt';

export default function({location}) {
  const publicKey = generatePublicKey();
  const code = getQueryParam('code', location);
  getJwtToken(publicKey, code);

  return <div></div>;
}

async function getJwtToken(publicKey,code) {
const response = await fetch(`api/auth/google/login?key=${encodeURIComponent(publicKey)}&code=${code}`);
if(!response.ok) {
  alert('Unauthorized')
  location.replace('/');
  return ;
}
const data = await response.json();
saveJwt(data.token);
location.replace('/');
}
