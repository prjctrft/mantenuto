import React from 'react';
import { connect } from 'react-redux';

import Home from './Home';

const HomeContainer = (props) => {
  if (props.user) {
    return (
      <Authenticated />
    );
  }
  return (
    <Home />
  );
}

export default connect(state => ({
    user: state.auth.user
  })
)(HomeContainer)
