import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  Profile,
  Talk,
  Listen,
  Register,
  Registered,
  Login,
  Rooms,
  NotFound,
  Password
} from 'modules';

import { TryAuth, RequireLoggedIn, RequireNotLoggedIn } from 'modules/Auth';

const Routes = () =>
  (
    <Route path='/' component={App}>
      <Route component={TryAuth}>
        <IndexRoute component={Home} />

        {/* Routes requiring login */}
        {/* <Route onEnter={requireLogin}> */}
        <Route component={RequireLoggedIn}>
          <Route path='profile' component={Profile} />
          { Talk }
          { Listen }
          {/* <Route path="talk" component={Talk} />
          <Route path="listen" component={Listen} /> */}
          { Rooms }
          {/* <Route path="rooms/:slug" component={Room} /> */}
          {/* <Route path="loginSuccess" component={LoginSuccess} /> */}
        </Route>

        {/* Routes disallow login */}
        <Route component={RequireNotLoggedIn}>
          { Login }
          { Password }
          { Register }
          <Route path='registered' component={Registered} />
        </Route>

        {/* Catch all route */}
        <Route path='*' component={NotFound} status={404} />
      </Route>
    </Route>
  );

export default Routes;
