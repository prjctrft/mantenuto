import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest/client';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';
import io from 'socket.io-client';
import superagent from 'superagent';
import config from './config';

const storage = __SERVER__ ? require('localstorage-memory') : window.localStorage;

const host = clientUrl => (__SERVER__ ? `http://${process.env.HOST}:${process.env.PORT}${clientUrl}` : clientUrl);

const configureApp = (transport) => feathers()
      .configure(transport)
      .configure(hooks())
      .configure(authentication({ storage,
        header: 'Authorization', // default
        path: '/auth', // the server side authentication service path
        jwtStrategy: 'jwt', // default
        entity: 'user', // default
        service: 'users', // default
        storageKey: 'feathers-jwt', // default
      }));

export const socket = io('', { path: host('/ws'), autoConnect: false });
const app = configureApp(socketio(socket));

export default app;

export const restApp = configureApp(rest(host('/api')).superagent(superagent));
