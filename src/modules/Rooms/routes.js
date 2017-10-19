import React from 'react';
import { Route } from 'react-router';

import RoomsController from './RoomsController';

export default (
  <Route path="rooms/:slug" component={RoomsController} />
);
