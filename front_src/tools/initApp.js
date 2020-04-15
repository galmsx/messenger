import getJwtPayload from './getJwtPayload';
import openSocket from 'socket.io-client';
import cryptico from 'cryptico-js';


export default function() {
  window.userInfo = getJwtPayload();
  window.socket = openSocket();
  socket.emit('initializeSocketMessage',localStorage.getItem('token'));
  window.RSAkey = cryptico.generateRSAKey(localStorage.getItem('pass'),1024);
}
