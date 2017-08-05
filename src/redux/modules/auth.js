import app, { restApp, socket } from 'app';
import { SubmissionError } from 'redux-form';
import cookie from 'js-cookie';

const LOAD_TOKEN = 'chat/auth/LOAD_TOKEN';
const LOAD = 'chat/auth/LOAD';
const LOAD_SUCCESS = 'chat/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'chat/auth/LOAD_FAIL';
const LOGIN = 'chat/auth/LOGIN';
const LOGIN_SUCCESS = 'chat/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'chat/auth/LOGIN_FAIL';
const REGISTER = 'chat/auth/REGISTER';
const REGISTER_SUCCESS = 'chat/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'chat/auth/REGISTER_FAIL';
const OAUTHLOGIN = 'chat/auth/OAUTHLOGIN';
const OAUTHLOGIN_SUCCESS = 'chat/auth/OAUTHLOGIN_SUCCESS';
const OAUTHLOGIN_FAIL = 'chat/auth/OAUTHLOGIN_FAIL';
const JWT_LOGIN = 'chat/auth/JWT_LOGIN';
const JWT_LOGIN_SUCCESS = 'chat/auth/JWT_LOGIN_SUCCESS';
const JWT_LOGIN_FAIL = 'chat/auth/JWT_LOGIN_FAIL';
const LOGOUT = 'chat/auth/LOGOUT';
const LOGOUT_SUCCESS = 'chat/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'chat/auth/LOGOUT_FAIL';

const userService = restApp.service('users');

const initialState = {
  loaded: false
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

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
        user: action.result.user
      };
    case JWT_LOGIN_FAIL:
    case LOGIN_FAIL:
    case OAUTHLOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        token: null,
        loginError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registeringIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registeringIn: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registeringIn: false,
        registerError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        token: null
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

export function startAuth(dispatch) {
  return app.passport.getJWT()
    .then((token) => {
      if(token) {
        return dispatch(jwtLogin(token))
      }
    })
  // const token = getToken();
  // if (token) {
  //   return dispatch(jwtLogin());
  // }
}

function saveAuth(response) {
  const token = response.accessToken;
  return app.passport.verifyJWT(token)
    .then(payload => {
      const id = payload.userId;
      app.set('token', token); // -> set manually the JWT
      // app.set('user', user); // -> set manually the user
      return {user: id, token};
      });

  // const storage = app.get('storage');
  // if (token) {
  //   storage.setItem('feathers-jwt', token);
  // } else {
  //   storage.removeItem('feathers-jwt');
  // }

  // app.set('token', token); // -> set manually the JWT
  // app.set('user', user); // -> set manually the user
  // restApp.set('token', token);
  // restApp.set('user', user);

  // console.log(app.get('token')); // -> the JWT
  // console.log(app.get('user')); // -> the user
}

// function getToken() {
//   const storage = app.get('storage');
//   const token = storage.getItem('feathers-jwt');
//   app.set('token', token);
//   return token;
// }

// function loadToken(token) {
//   return {
//     type: LOAD_TOKEN,
//     token
//   };
// }

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

// export function load(state, dispatch) {
//   //check if session exists
//   if(!cookie.get('feathers-session')) {
//     let token;
//     if(!state.auth.token) {
//       token = getToken();
//     }
//     if(token) {
//       dispatch(loadToken(token))
//       saveAuth({token});
//       return jwtLogin();
//     }
//   }
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: client => client.get('/auth/load')
//   };
// }

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: () => userService.create(data).catch(catchValidation)
  };
}

export function login(data) {
  const socketId = socket.io.engine.id;
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: () => app.authenticate({
      strategy: 'local',
      email: data.email,
      password: data.password,
      socketId
    })
    .then(saveAuth)
    .catch(catchValidation)
  }
}

// export function oauthLogin(provider, data, validation = false) {
//   const socketId = socket.io.engine.id;
//   return {
//     types: [OAUTHLOGIN, OAUTHLOGIN_SUCCESS, OAUTHLOGIN_FAIL],
//     promise: () => restApp.service(`/auth/${provider}`)
//       .create({ ...data, socketId })
//       .then(saveAuth)
//       .then(setCookie)
//       .catch(validation ? catchValidation : error => Promise.reject(error))
//   };
// }

export function jwtLogin(token) {
  const accessToken = token;
  return {
    types: [JWT_LOGIN, JWT_LOGIN_SUCCESS, JWT_LOGIN_FAIL],
    promise: () => app.authenticate({
      strategy: 'jwt',
      accessToken
    })
    .then(saveAuth)
    .catch(catchValidation)
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () => (socket.connected ? app : restApp).logout()
  };
}
