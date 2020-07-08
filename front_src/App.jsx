import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './components/Auth/Auth';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import KeyGenerator from './components/Auth/KeyGenerator';
import 'regenerator-runtime/runtime.js';
import initApp from './tools/initApp';
import AppContainer from './components/AppContainer/AppContainer';

//In cause of deadlines i had no time to read about redux so...)))

function isSigned() {
  return localStorage.getItem('token');
}

function App() {
  const signed = isSigned();
  if (signed) {
    initApp();
  }

  return signed ? (
    <Switch>
      <Route path={'/chat/:chatId'} component={AppContainer} />
      <Route path={'/'} component={AppContainer} />
    </Switch>
  ) : (
    <Switch>
      <Route path="/generate_key" component={KeyGenerator} />
      <Route path="/" component={Auth} />
    </Switch>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app'),
);
