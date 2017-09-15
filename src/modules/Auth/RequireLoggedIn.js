import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router';

class RequireLoggedIn extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.tryingAuth || nextProps.authenticated) {
      return;
    }
    if (nextProps.triedAuth) {
      return this.props.push('/');
    }
  }

  render() {
    return <div>{ this.props.children }</div>
  }
}

const mapStateToProps = (state) => {
  const { tryingAuth, triedAuth } = state.auth;
  const authenticated = state.auth.user;
  return { tryingAuth, triedAuth, authenticated }
}

export default connect(mapStateToProps, { push })(RequireLoggedIn);
