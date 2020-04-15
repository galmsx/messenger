import cryptico from 'cryptico-js';

export default function() {
  const pass = generateAndSavePassword();
  const RSAkey = cryptico.generateRSAKey(pass,1024);
  return cryptico.publicKeyString(RSAkey);
};

function generateAndSavePassword() {
  const pass = prompt("Enter your secret key:", randomString(10));
  localStorage.setItem("pass", pass);
  return pass;
}

function randomString(i) {
  var rnd = '';
  while (rnd.length < i)
    rnd += Math.random().toString(36).substring(2);
  return rnd.substring(0, i);
};

