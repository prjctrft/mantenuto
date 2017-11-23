import { restApp } from 'app';

const RESET_PASSWORD = 'Password/RESET_PASSWORD';
const RESET_PASSWORD_SUCCESS = 'Password/RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAIL = 'Password/RESET_PASSWORD_FAIL';
const UPDATE_PASSWORD = 'Password/UPDATE_PASSWORD';
const UPDATE_PASSWORD_SUCCESS = 'Password/UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAIL = 'Password/UPDATE_PASSWORD_FAIL';

// redux form handles everything we need for this module to work
// therefore these actions are just for logging and don't actually update
// the state
export default function (state = {}, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}

export const forgotPassword = (email) =>  {
  return {
    types: [RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL],
    promise: () => restApp.service('/users/reset-password')
      .create({ email })      
  };
};

export const updatePassword = ({token, password, confirm}) => {
  return {
    types: [UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL],
    promise: () => restApp.service(`/users/reset-password/${token}`)
      .create({ password, confirm })
  };
}
