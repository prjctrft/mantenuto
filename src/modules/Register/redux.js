import app from 'app';

const GET_CODES = 'chat/register/GET_CODES';
const GET_CODES_SUCCESS = 'chat/register/GET_CODES_SUCCESS';
const GET_CODES_FAIL = 'chat/register/GET_CODES_FAIL';

const initialState = {
  codes: []
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case GET_CODES_SUCCESS:
      const codes = action.result.map((code) => (code.code));
      return {
        ...state,
        codes
      }
    case GET_CODES_FAIL:
    case GET_CODES:
    default:
      return state;
  }
}

export function getCodes(token) {
  const accessToken = token;
  return {
    types: [GET_CODES, GET_CODES_SUCCESS, GET_CODES_FAIL],
    promise: () => app.service('speakeasy')
      .find()
  };
}
