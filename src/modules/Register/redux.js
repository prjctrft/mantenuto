import app from 'app';

const REGISTER = 'chat/register/REGISTER';
const REGISTER_SUCCESS = 'chat/register/REGISTER_SUCCESS';
const REGISTER_FAIL = 'chat/register/REGISTER_FAIL';

const initialState = {};

export function registerReducer(state = initialState, action = {}) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: () => app.service('users')
      .create(data)
      .catch(() => {

      })
  };
}
