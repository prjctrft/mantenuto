import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';

import { authReducer as auth } from 'modules/Auth/redux';
import notifs from 'modules/Notifs/redux';
import rooms from 'modules/Rooms/reducer';
import { userReducer as user } from 'modules/user/redux';
import home from 'modules/Home/redux';
import { registerReducer as register } from 'modules/Register/redux';

export default function createReducer(asyncReducers) {
  return combineReducers({
    // injected on server
    __mantenuto: (state={}) => (state),
    routing: routerReducer,
    reduxAsyncConnect,
    form,
    notifs,
    auth,
    user,
    rooms,
    home,
    register,
    ...asyncReducers
  });
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
