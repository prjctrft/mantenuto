import React from 'react';
import { connect } from 'react-redux';

import Authenticated from './Authenticated';
import Home from './Home';

const HomeContainer = (props) => {
  // NOTE: if we want more routes that allow a logged in version
  // and a no logged in version, we can abstract this logic to
  // /modules/Auth
  if (props.tryingAuth || !props.triedAuth) {
    // TODO: replace with spinner
    return null;
  }
  if (props.authenticated) {
    return (
      <Authenticated />
    );
  }
  if (props.triedAuth) {
    return (
      <Home />
    );
  }
}

export default connect(state => ({
    authenticated: state.auth.user,
    tryingAuth: state.auth.tryingAuth,
    triedAuth: state.auth.triedAuth
  })
)(HomeContainer)
