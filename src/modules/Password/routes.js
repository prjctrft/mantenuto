import React from 'react';
import { IndexRedirect, Route } from 'react-router';

import Forgot from './components/Forgot';
// import Token from './components/Token';
// import Confirm from './components/Confirm';
import Reset from './components/Reset'
import Change from './components/Change';

// required for hot reloader
if (process.env.NODE_ENV !== 'production') {
  require('./components/Forgot');
  // require('./components/Token');
  // require('./components/Confirm');
  require('./components/Reset');
  require('./components/Change');
}

const routes = (
  <Route path='password'>
    <IndexRedirect to='forgot' />
    <Route path='forgot' component={Forgot} />
    <Route path='reset' component={Reset} />
    <Route path='change/:token' component={Change} />
    {/* <Route path='confirm' component={Confirm} />
    <Route path=':token' component={Token} /> */}
  </Route>
);

export default routes;
