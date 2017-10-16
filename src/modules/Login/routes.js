import React from 'react';
import { Route } from 'react-router';

import ConnectLogin from './Login';

// required for hot reloader
if (process.env.NODE_ENV !== 'production') {
  require('./Login');
}

export default (
  <Route path='login' component={ConnectLogin} />
);
