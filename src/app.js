import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import io from 'socket.io-client';
import rest from 'feathers-rest/client';
// const socketio = require('feathers-socketio/client');
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';
import superagent from 'superagent';

const storage = __SERVER__ ? require('localstorage-memory') : window.localStorage;
const apiEndpoint = __SERVER__ ? process.env.API_ENDPOINT : window.__data.__mantenuto.apiEndpoint;

const host = clientUrl => {
  return apiEndpoint + clientUrl;
}

export const socket = io(apiEndpoint, { path: '/ws', autoConnect: false });

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

debugger;
export default configureApp(socketio(socket));
export const restApp = configureApp(rest(host('')).superagent(superagent));
