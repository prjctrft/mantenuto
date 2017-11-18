import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { populateUser } from 'modules/user/redux';

export class RequireLoggedInComponent extends Component {

  static propTypes = {
    tryingAuth: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    triedAuth: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    push: PropTypes.func.isRequired
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.tryingAuth || nextProps.authenticated) {
      return;
    }
    if (nextProps.triedAuth) {
      return this.props.push('/login');
    }
  }

  render() {
    if (this.props.authenticated) {
      return <div>{ this.props.children }</div>
    }
    if (this.props.tryingAuth) {
      // change to spinner
      return <h1>Loading...</h1>;
    }
    if (this.props.triedAuth) {
      return null;
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  const { tryingAuth, triedAuth } = state.auth;
  const authenticated = !!state.auth.user;
  return {
    tryingAuth,
    triedAuth,
    authenticated
  }
}

export default connect(mapStateToProps, { push, populateUser })(RequireLoggedInComponent);
