import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import createMiddleware from './middleware/clientMiddleware';
import createReducer, { injectAsyncReducer } from './reducer';


export default function createStore(history, client, data) {
  const middleware = [thunk, createMiddleware(client), routerMiddleware(history)];

  let enhancers = [applyMiddleware(...middleware)];
  if (__CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools'); // eslint-disable-line import/no-extraneous-dependencies
    const DevTools = require('../modules/DevTools/DevTools');
    enhancers = [
      ...enhancers,
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ];
  }
  const finalCreateStore = compose(...enhancers)(_createStore);
  const store = finalCreateStore(createReducer(), data);

  store.asyncReducers = {};
  store.injectAsyncReducer = injectAsyncReducer.bind(null, store);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default());
    });
  }

  return store;
}
