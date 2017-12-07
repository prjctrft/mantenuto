import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Register from './Register';
import RegisterFormWrapper from './components/RegisterFormWrapper';

// required for hot reloader
if (process.env.NODE_ENV !== 'production') {
  require('./Register');
  require('./components/RegisterForm');
}

const routes = (
  <Route path='register'>
    <IndexRoute component={Register} />
    <Route path=':type' component={RegisterFormWrapper}/>
  </Route>
);

export default routes;
