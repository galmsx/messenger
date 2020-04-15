import cryptico from 'cryptico-js';

export default function(content) {
return decodeURIComponent(cryptico.decrypt(content, window.RSAkey).plaintext);
}
