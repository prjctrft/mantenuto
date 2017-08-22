/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { AppContainer as HotEnabler } from 'react-hot-loader';
import { useScroll } from 'react-router-scroll';
import { socket } from 'app';
// import { jwtLogin } from './redux/modules/auth';
import { socketAuth } from './redux/modules/auth';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';

const client = new ApiClient();
const dest = document.getElementById('content');
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

// hoist __mantenuto data to a global with information about the app
window.mantenuto = window.__data.__mantenuto;

const renderRouter = props => <ReduxAsyncConnect
  {...props}
  helpers={{ client }}
  filter={item => !item.deferred}
  render={applyRouterMiddleware(useScroll())}
/>;

const render = routes => {
  ReactDOM.render(
    <HotEnabler>
      <Provider store={store} key="provider">
        <Router history={history} render={renderRouter}>
          {routes}
        </Router>
      </Provider>
    </HotEnabler>,
    dest
  );
};

const isOnline = window.__data;

if (isOnline) {
  global.socket = socket;
  socket.open();
  // wait on client side rendering with socket.io provider
  // until socket has tried authentication
  // socketAuth(store.dispatch)
  //   .then(() => render(getRoutes(store)) );;
  socketAuth(store.dispatch);
}

render(getRoutes(store));

if (module.hot) {
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes')(store);
    render(nextRoutes);
  });
}

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes
    || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded.' +
      'Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const devToolsDest = document.createElement('div');
  window.document.body.insertBefore(devToolsDest, null);
  const DevTools = require('./modules/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>,
    devToolsDest
  );
}
