import React from 'react';
const { redirect_uri, client_id } = require('../../config.json');

function Auth() {
  return (
    <main className="auth">
      <a
        className="auth-g"
        href={`https://accounts.google.com/o/oauth2/auth?redirect_uri=${redirect_uri}&response_type=code&client_id=${client_id}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile`}
      >
        <i className="fab fa-google" />
        <span> Войти с помощью Google</span>
      </a>
    </main>
  );
}
export default Auth;
