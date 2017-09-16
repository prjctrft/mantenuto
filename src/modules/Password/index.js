import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';

import Forgot from './components/Forgot';
import SendEmail from './components/SendEmail';
import ChangePassword from './components/ChangePassword';
import Token from './components/Token';
import Confirm from './components/Confirm';

// required for hot reloader
if (process.env.NODE_ENV !== 'production') {
  require('./components/Forgot');
  require('./components/SendEmail');
  require('./components/ChangePassword');
  require('./components/Token');
  require('./components/Confirm');
}

const routes = (
  <Route path='password'>
    <IndexRedirect to='forgot' />
    <Route path='forgot' component={Forgot} />
    <Route path='sendemail' component={SendEmail} />
    <Route path='changepassword' component={ChangePassword} />
    <Route path='confirm' component={Confirm} />
    <Route path=':token' component={Token} />
  </Route>
);

export default routes;
