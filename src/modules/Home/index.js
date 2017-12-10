import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Authenticated from './Authenticated';
import ConnectHome from './Home';

const HomeContainer = (props) => {
  if (props.authenticated) {
    return (
      <Authenticated />
    );
  }
  return <ConnectHome />
}

HomeContainer.propTypes = {
  tryingAuth: PropTypes.bool.isRequired,
  triedAuth: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired
}

export default connect(state => ({
    authenticated: !!state.auth.user,
    tryingAuth: state.auth.tryingAuth,
    triedAuth: state.auth.triedAuth
  })
)(HomeContainer)
