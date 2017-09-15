import app, { restApp, socket } from 'app';
import { SubmissionError } from 'redux-form';
import cookie from 'react-cookie';

const LOAD_TOKEN = 'chat/auth/LOAD_TOKEN';
const LOAD = 'chat/auth/LOAD';
const LOAD_SUCCESS = 'chat/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'chat/auth/LOAD_FAIL';
const LOGIN = 'chat/auth/LOGIN';
const LOGIN_SUCCESS = 'chat/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'chat/auth/LOGIN_FAIL';
// const REGISTER = 'chat/auth/REGISTER';
// const REGISTER_SUCCESS = 'chat/auth/REGISTER_SUCCESS';
// const REGISTER_FAIL = 'chat/auth/REGISTER_FAIL';
const OAUTHLOGIN = 'chat/auth/OAUTHLOGIN';
const OAUTHLOGIN_SUCCESS = 'chat/auth/OAUTHLOGIN_SUCCESS';
const OAUTHLOGIN_FAIL = 'chat/auth/OAUTHLOGIN_FAIL';
const JWT_LOGIN = 'chat/auth/JWT_LOGIN';
const JWT_LOGIN_SUCCESS = 'chat/auth/JWT_LOGIN_SUCCESS';
const JWT_LOGIN_FAIL = 'chat/auth/JWT_LOGIN_FAIL';
const SOCKET_AUTHENTICATED = 'chat/auth/SOCKET_AUTHENTICATED';
const LOGOUT = 'chat/auth/LOGOUT';
const LOGOUT_SUCCESS = 'chat/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'chat/auth/LOGOUT_FAIL';
const TRIED_AUTH = 'chat/auth/TRIED_AUTH';
const TRIED_SOCKET_AUTH = 'chat/auth/TRIED_SOCKET_AUTH';
const TRYING_AUTH = 'chat/auth/TRYING_AUTH';
const TOKEN_NOT_FOUND = 'chat/auth/TOKEN_NOT_FOUND';

const initialState = {
  triedAuth: false,
  tryingAuth: false,
  loaded: false,
  triedSocketAuth: false,
  socketAuthenticated: false,
  token: null,
  user: undefined,
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
    case LOAD_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        token: action.result.token,
        user: action.result.user
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case JWT_LOGIN:
    case LOGIN:
    case OAUTHLOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case JWT_LOGIN_SUCCESS:
    case LOGIN_SUCCESS:
    case OAUTHLOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.result.token,
        user: action.result.user,
        tryingAuth: false,
        triedAuth: true
      };
    case JWT_LOGIN_FAIL:
    case LOGIN_FAIL:
    case OAUTHLOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        token: null,
        loginError: action.error,
        tryingAuth: false,
        triedAuth: true
      };
    case SOCKET_AUTHENTICATED:
      return {
        ...state,
        socketAuthenticated: action.socketAuthenticated
      }
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function tryRestAuth() {
  return (dispatch, getState) => {
    const token = getState().auth.token || cookie.load('feathers-jwt');
    if(token) {
      dispatch({ type: TRYING_AUTH });
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
    return dispatch(jwtLogin(token, app))//.then(() => {
      //debugger;
    //});
  }
}

function saveAuth(response) {
  const token = response.accessToken;
  return app.passport.verifyJWT(token)
    .then(payload => {
      const id = payload.userId;
      // app.set('accessToken', token); // -> set manually the JWT
      // restApp.set('accessToken', token);
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

function socketAuthenticated(response) {
  const socketAuthenticated = true;
  return {
    type: SOCKET_AUTHENTICATED,
    socketAuthenticated
  }
}

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
};
