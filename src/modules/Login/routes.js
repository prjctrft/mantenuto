import React from 'react';
import { Route } from 'react-router';

import ConnectLogin from './Login';

// required for hot reloader
// if (process.env.NODE_ENV !== 'production') {
//   require('./Login');
// }

const loginRoutes = <Route path='login' component={ConnectLogin} />;

export default loginRoutes;
