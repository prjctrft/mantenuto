import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { reducer as form } from 'redux-form';
import auth from './modules/auth';
import notifs from '../modules/Notifs/redux';
import counter from './modules/counter';
import info from './modules/info';
import rooms from '../modules/Room/reducer';
import { userReducer as user } from '../modules/App/redux';
import home from '../modules/Home/redux';
// import register from '../modules/Register/redux';

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
    // register,
    counter: multireducer({
      counter1: counter,
      counter2: counter,
      counter3: counter
    }),
    info,
    ...asyncReducers
  });
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
