import { restApp } from 'app';

const RESET_PASSWORD = 'Password/RESET_PASSWORD';
const RESET_PASSWORD_SUCESS = 'Password/RESET_PASSWORD_SUCESS';
const RESET_PASSWORD_FAIL = 'Password/RESET_PASSWORD_FAIL';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case RESET_PASSWORD_FAIL:
    case RESET_PASSWORD:
    case RESET_PASSWORD_SUCESS:
    default:
      return state;
  }
}

export function forgotPassword(email) {
  return {
    types: [RESET_PASSWORD, RESET_PASSWORD_SUCESS, RESET_PASSWORD_FAIL],
    promise: () => restApp.service('/users/reset-password')
      .create({ email })
  };
}
