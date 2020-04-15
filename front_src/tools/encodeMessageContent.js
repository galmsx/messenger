import cryptico from 'cryptico-js';

export default function(content, publicKey) {
  return cryptico.encrypt(encodeURIComponent(content), publicKey).cipher;
}
