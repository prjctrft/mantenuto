import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { push } from 'react-router-redux';
import { startAuth, isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Home,
  Profile,
  Talk,
  Listen,
  Register,
  Registered,
  Login,
  Room,
  LoginSuccess,
  NotFound,
  Password
} from 'modules';

export default store => {
  // const loadAuthIfNeeded = cb => {
  //   const state = store.getState();
  //   if (!isAuthLoaded(state)) {
  //     return store.dispatch(loadAuth(state, store.dispatch))
  //     .then(() => cb())
  //   }
  //   return cb();
  // };
  // const checkUser = (cond, replace, cb) => {
  //   const { auth: { user } } = store.getState();
  //   if (!cond(user)) replace('/');
  //   cb();
  // };

  const requireNotLogged = (nextState, replace, cb) => {
    const state = store.getState();
    if (state.auth.user) {
      push('/');
    }
    cb();
    // const cond = user => !user;
    // loadAuthIfNeeded(() => checkUser(cond, replace, cb));
  };
  const requireLogin = (nextState, replace, cb) => {
    const state = store.getState();
    if (!state.auth.user) {
      // debugger;
      // let next = '/';
      // if ()
      const next = nextState.location.pathname;
      replace(push(`/login?next=${next}`));
    }
    cb();
  };
  const tryAuth = (nextState, replace, cb) => {
    const state = store.getState();
    const dispatch = store.dispatch;
    if (!state.auth.user) {
      return startAuth(dispatch).then(() => {
        cb();
      }).catch((foo) => {
        cb();
      })
    }
    cb();
  };

  return (
    <Route onEnter={tryAuth} path="/" component={App}>
      <IndexRoute component={Home} />

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="profile" component={Profile} />
        <Route path="talk" component={Talk} />
        <Route path="listen" component={Listen} />
        <Route path="rooms/:slug" component={Room} />
        {/* <Route path="loginSuccess" component={LoginSuccess} /> */}
      </Route>

      {/* Routes disallow login */}
      <Route onEnter={requireNotLogged}>
        <Route path="login" component={Login} />
        { Password }
        { Register }
        {/* <Route path="register" component={Register} /> */}
        <Route path="registered" component={Registered} />
      </Route>

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
