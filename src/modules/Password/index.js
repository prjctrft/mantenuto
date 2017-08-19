import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Password from './components/Password';
import Token from './components/Token';
import Confirm from './components/Confirm';

// required for hot reloader
if (process.env.NODE_ENV !== 'production') {
  require('./components/Password');
  require('./components/Token');
  require('./components/Confirm');
}

const routes = (
  <Route path="password">
    <IndexRoute component={Password} />
    <Route path="confirm" component={Confirm} />
    <Route path=":token" component={Token} />
  </Route>
);

export default routes;
