import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export class RequireNotLoggedIn extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.tryingAuth || nextProps.authenticated) {
      this.props.push('/');
    }
  }

  render() {
    return <div>{ this.props.children }</div>
  }
}

const mapStateToProps = (state) => {
  const tryingAuth = state.auth.tryingAuth;
  const authenticated = state.auth.user;
  return { tryingAuth, authenticated }
}

export default connect(mapStateToProps, { push })(RequireNotLoggedIn);
