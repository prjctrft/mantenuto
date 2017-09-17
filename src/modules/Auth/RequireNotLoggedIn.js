import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export class RequireNotLoggedInComponent extends Component {

  static propTypes = {
    push: PropTypes.func.isRequired,
    tryingAuth: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
  }

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
  const authenticated = !!state.auth.user;
  return { tryingAuth, authenticated }
}

export default connect(mapStateToProps, { push })(RequireNotLoggedInComponent);
