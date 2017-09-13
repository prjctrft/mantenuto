import React from 'react';
import { Route } from 'react-router';

import Room from './Room';

export default (
  <Route path="rooms/:slug" component={Room} />
);
