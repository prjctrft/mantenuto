import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { AppContainer as HotEnabler } from 'react-hot-loader'; // eslint-disable-line  import/no-extraneous-dependencies
import { useScroll } from 'react-router-scroll';
import ReactGA from 'react-ga';
import createStore from './redux/create';
import getRoutes from './routes';
import client, { socket } from './app';

const dest = document.getElementById('content');
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

// hoist __mantenuto data to a global with information about the app
window.mantenuto = window.__data.__mantenuto;

const renderRouter = props => (<ReduxAsyncConnect
  {...props}
  helpers={{ client }}
  filter={item => !item.deferred}
  render={applyRouterMiddleware(useScroll())}
/>);

ReactGA.initialize('UA-111261926-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const render = routes => {
  ReactDOM.render(
    <HotEnabler warnings={false}>
      <Provider store={store} key="provider">
        <Router history={history} render={renderRouter} onUpdate={logPageView}>
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
    console.error('Server-side React render was discarded.' + //eslint-disable-line no-console
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
