import React from 'react';
import { expect } from 'chai';
import { authReducer } from './redux';

import {
  TOKEN_NOT_FOUND,
  TRYING_AUTH,
  TRIED_AUTH,
  TRIED_SOCKET_AUTH,
  JWT_LOGIN_SUCCESS,
  LOGIN_SUCCESS,
  JWT_LOGIN_FAIL,
  LOGIN_FAIL,
  SOCKET_AUTHENTICATED,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from './redux';

const initialState = {
  triedAuth: false,
  tryingAuth: false,
  triedSocketAuth: false,
  socketAuthenticated: false,
  token: null,
  user: undefined,
}

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).to.deep.equal(initialState);
  })

  it('TOKEN_NOT_FOUND should return expected state', () => {
    const state = authReducer(undefined, {type: TOKEN_NOT_FOUND});
    const expectedState = {...initialState, triedAuth: true};
    expect(state).to.deep.equal(expectedState);
  });

  it('TRYING_AUTH should return expected state', () => {
    const state = authReducer(undefined, {type: TRYING_AUTH});
    const expectedState = {...initialState, tryingAuth: true};
    expect(state).to.deep.equal(expectedState);
  });

  it('TRIED_AUTH should return expected state', () => {
    const state = authReducer(undefined, {type: TRIED_AUTH});
    const expectedState = {...initialState, triedAuth: true};
    expect(state).to.deep.equal(expectedState);
  });

  it('TRIED_SOCKET_AUTH should return expected state', () => {
    const state = authReducer(undefined, {type: TRIED_SOCKET_AUTH});
    const expectedState = {...initialState, triedSocketAuth: true};
    expect(state).to.deep.equal(expectedState);
  });

  const successActions = [JWT_LOGIN_SUCCESS, LOGIN_SUCCESS];
  describe('', () => {
    successActions.map((type) => {
      it(`${type} should return expected state`, () => {
        const result = {token: 'foo', user: 'Bob'};
        const newState = {tryingAuth: false, triedAuth: true };
        const action = {
          type,
          result,
          ...newState
        };
        const state = authReducer(undefined, action);
        const expectedState = {...initialState, ...newState, ...result};
        expect(state).to.deep.equal(expectedState);
      });
    });
  });

  const failActions = [JWT_LOGIN_FAIL, LOGIN_FAIL];
  describe('', () => {
    failActions.map((type) => {
      it(`${type} should return expected state`, () => {
        const error = 'I smell something burning';
        const newState = {token: null, tryingAuth: false, triedAuth: true };
        const action = {
          type,
          error,
          ...newState
        };
        const state = authReducer(undefined, action);
        const expectedState = {...initialState, ...newState, loginError: error};
        expect(state).to.deep.equal(expectedState);
      });
    });
  });

  it('SOCKET_AUTHENTICATED should return the expected state', () => {
    const state = authReducer(undefined, {type: SOCKET_AUTHENTICATED});
    const expectedState = {...initialState, socketAuthenticated: true};
    expect(state).to.deep.equal(expectedState);
  });

  it('LOGOUT_SUCCESS should return the initialState state', () => {
    const state = authReducer(undefined, {type: LOGOUT_SUCCESS});
    expect(state).to.deep.equal(initialState);
  });

  it('LOGOUT_FAIL should return the expected state', () => {
    const error = 'Go Ducks!';
    const action = {
      error,
      type: LOGOUT_FAIL
    }
    const state = authReducer(undefined, action);
    const expectedState = {...initialState, logoutError: error};
    expect(state).to.deep.equal(expectedState);
  });

});
