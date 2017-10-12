import express from 'express';
import cookieParser from 'cookie-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import cookie from 'react-cookie';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
// import PrettyError from 'pretty-error';
import http from 'http';
// import ssl  from 'express-ssl';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';

import client from './app';
import config from './config';
import createStore from './redux/create';
// import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import getRoutes from './routes';
// const p = require('../../package.json');
// const { version } = p;

import { version } from '../package.json';

// remote api
const targetUrl = process.env.API_ENDPOINT;

// const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  ws: true,
  xfwd: true,
  changeOrigin: true
});

app.use(compression());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(express.static(path.join(__dirname, '..', 'static')));

// Redirect http to https
// app.all('*', function(req,res,next) {
//   if(req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
//   // if(req.headers['x-forwarded-proto'] !== 'https') {
//     res.redirect('https://'+ req.hostname + req.url)
//   } else {
//     next()
//   }
// });

app.use('/admin', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/admin` });
});

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/ws` });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head, { target: targetUrl });
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  // if (error.code !== 'ECONNRESET') {
  //   console.error('proxy error', error);
  // }
  // if (res && !res.headersSent) {
  //   res.writeHead(500, { 'content-type': 'application/json' });
  // }
  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

// let unplug;

app.use((req, res) => {

  if(req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://'+ req.hostname + req.url)
  }


  // unplug = cookie.plugToRequest(req, res);
  cookie.plugToRequest(req, res);
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  // const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client, {__mantenuto: { version }});
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send(`<!doctype html>
      ${ReactDOMServer.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />)}`);
  }

  if (__DISABLE_SSR__) {
    return hydrateOnClient();
  }

  match({
    history,
    routes: getRoutes(store),
    location: req.originalUrl
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store, helpers: { client } }).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        global.navigator = { userAgent: req.headers['user-agent'] };

        res.send(`<!doctype html>
        ${ReactDOMServer.renderToString(
          <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
        )}`);
      }).catch((err) => {
        res.status(500);
      })
    } else {
      res.status(404).send('Not found');
    }
  })
  // unplug();
});

const port = process.env.PORT;

server.listen(port, err => {
  if (err) {
    console.error(err); // eslint-disable-line no-console
  }
  console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.API); // eslint-disable-line no-console
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, port); // eslint-disable-line no-console
});
