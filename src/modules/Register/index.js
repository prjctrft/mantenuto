import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';

import Register from './Register';
import RegisterType from './components/RegisterType';

// required for hot reloader
if (process.env.NODE_ENV !== 'production') {
  require('./Register');
  require('./components/RegisterType');
}

const routes = (
  <Route path='register'>
    <IndexRoute component={Register} />
    <Route path=':type' component={RegisterType} />
  </Route>
);

export default routes;
