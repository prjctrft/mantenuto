import app, { restApp, socket } from 'app';
import { SubmissionError } from 'redux-form';
import cookie from 'react-cookie';

export const LOGIN = 'chat/auth/LOGIN';
export const LOGIN_SUCCESS = 'chat/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'chat/auth/LOGIN_FAIL';
export const JWT_LOGIN = 'chat/auth/JWT_LOGIN';
export const JWT_LOGIN_SUCCESS = 'chat/auth/JWT_LOGIN_SUCCESS';
export const JWT_LOGIN_FAIL = 'chat/auth/JWT_LOGIN_FAIL';
export const SOCKET_AUTHENTICATED = 'chat/auth/SOCKET_AUTHENTICATED';
export const LOGOUT = 'chat/auth/LOGOUT';
export const LOGOUT_SUCCESS = 'chat/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'chat/auth/LOGOUT_FAIL';
export const TRIED_AUTH = 'chat/auth/TRIED_AUTH';
export const TRIED_SOCKET_AUTH = 'chat/auth/TRIED_SOCKET_AUTH';
export const TRYING_AUTH = 'chat/auth/TRYING_AUTH';
export const TOKEN_NOT_FOUND = 'chat/auth/TOKEN_NOT_FOUND';

const initialState = {
  triedAuth: false,
  tryingAuth: false,
  triedSocketAuth: false,
  socketAuthenticated: false,
  token: null,
  user: null,
};

const catchValidation = error => {
  if (error.message) {
    if (error.message === 'Validation failed' && error.data) {
      throw new SubmissionError(error.data);
    }
    throw new SubmissionError({ _error: error.message });
  }
  return Promise.reject(error);
};

export function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOKEN_NOT_FOUND:
      return {
        ...state,
        triedAuth: true
      }
    case TRYING_AUTH:
      return {
        ...state,
        tryingAuth: true
      }
    case TRIED_AUTH:
      return {
        ...state,
        triedAuth: true
      }
    case TRIED_SOCKET_AUTH:
      return {
        ...state,
        triedSocketAuth: true
      }
    case JWT_LOGIN_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.result.token,
        user: action.result.user,
        tryingAuth: false,
        triedAuth: true
      };
    case JWT_LOGIN_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        loginError: action.error,
        tryingAuth: false,
        triedAuth: true
      };
    case SOCKET_AUTHENTICATED:
      return {
        ...state,
        socketAuthenticated: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        logoutError: action.error
      };
    case LOGOUT:
    case JWT_LOGIN:
    case LOGIN:
    default:
      return state;
  }
}

export function tryRestAuth() {
  return (dispatch, getState) => {
    const token = getState().auth.token
      || cookie.load('feathers-jwt')
      || (__CLIENT__ && localStorage.getItem('feathers-jwt'));
    if(token) {
      dispatch({ type: TRYING_AUTH })
      return dispatch(jwtLogin(token, restApp));
    }
    return dispatch({ type: TOKEN_NOT_FOUND });
  }
}

export function socketAuth() {
  return (dispatch, getState) => {
    // socketAuth will only be tried on the client
    // and will always run AFTER rest client has been authenticated
    const token = getState().auth.token;
    dispatch({ type: TRIED_SOCKET_AUTH });
    return dispatch(jwtLogin(token, app));
  }
}

function saveAuth(response) {
  const token = response.accessToken;
  return app.passport.verifyJWT(token)
    .then(payload => {
      const id = payload.userId;
      cookie.save('feathers-jwt', token);
      return { user: id, token };
    });
}

export function login(data) {
  const socketId = socket.io.engine.id;
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.authenticate({
      strategy: 'local',
      email: data.email,
      password: data.password,
      socketId
    })
    .then(saveAuth)
    .catch(catchValidation)
  }
}

export function jwtLogin(token, client) {
  return {
    types: [JWT_LOGIN, JWT_LOGIN_SUCCESS, JWT_LOGIN_FAIL],
    promise: () => client.authenticate({
      strategy: 'jwt',
      accessToken: token
    })
    .then(saveAuth)
    .catch(catchValidation)
  };
}

// function socketAuthenticated() {
//   return {
//     type: SOCKET_AUTHENTICATED
//   }
// }

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () => {
      return Promise.all([ app.logout(), restApp.logout() ])
        .then(cleanStorage);
    }
  }
}

function cleanStorage() {
  cookie.remove('feathers-jwt');
  cookie.remove('feathers-session');
  cookie.remove('io');
  localStorage.removeItem('feathers-jwt')
}
