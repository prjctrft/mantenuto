import React from 'react';
import { Route } from 'react-router';

import Listen from './Listen';

// for react-hot-reloader
if (process.env.NODE_ENV !== 'production') {
  require('./components/Connecting');
  require('./components/Preferences');
}

export default (
  <Route path='listen' component={ Listen } />
);
