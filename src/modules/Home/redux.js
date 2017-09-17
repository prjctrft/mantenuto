const GET_CODES = 'Home/GET_CODES';
const GET_CODES_SUCCESS = 'Home/GET_CODES_SUCCESS';
const GET_CODES_FAIL = 'Home/GET_CODES_FAIL';

const initialState = {
  codes: []
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case GET_CODES_SUCCESS:
      return {
        ...state,
        codes: action.result.map((code) => (code.code))
      }
    case GET_CODES_FAIL:
    case GET_CODES:
    default:
      return state;
  }
}

export function getCodes() {
  return {
    types: [GET_CODES, GET_CODES_SUCCESS, GET_CODES_FAIL],
    promise: (client) => client.service('speakeasy')
      .find()
  };
}
