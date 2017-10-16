import React from 'react';
import { IndexRedirect, Route } from 'react-router';

import Forgot from './components/Forgot';
// import Token from './components/Token';
// import Confirm from './components/Confirm';
import SentEmail from './components/SentEmail'
// import ChangePassword from './components/ChangePassword';

// required for hot reloader
if (process.env.NODE_ENV !== 'production') {
  require('./components/Forgot');
  // require('./components/Token');
  // require('./components/Confirm');
  require('./components/SentEmail');
  // require('./components/ChangePassword');
}

const routes = (
  <Route path='password'>
    <IndexRedirect to='forgot' />
    <Route path='forgot' component={Forgot} />
    <Route path='reset' component={SentEmail} />
    {/* <Route path='changepassword' component={ChangePassword} />
    <Route path='confirm' component={Confirm} />
    <Route path=':token' component={Token} /> */}
  </Route>
);

export default routes;
